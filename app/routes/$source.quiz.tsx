import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  replace,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { commitSession, destroySession, getSession } from "~/sessions";
import invariant from "tiny-invariant";
import { Card } from "~/types/cards";
import { convertToCard } from "~/types/utils";
import FlashcardHeader from "~/components/FlashcardHeader";
import FlashcardContent from "~/components/FlashcardContent";
import { checkAnswer } from "~/utils/validation";
import { saveUserAnswer } from "~/utils/fetchers";

type LoaderData = {
  card: Card;
};

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.source, "Missing source param");
  const res = await fetch(`http://localhost:8080/v1/api/reviews/1`);
  const { data } = await res.json();
  return { card: convertToCard(data) };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.source, "Missing source param");
  invariant(params.cardId, "Missing cardId param");
  const formData = await request.formData();
  const response = Object.fromEntries(formData);

  const session = await getSession(request.headers.get("Cookie"));
  const cards = (session.get("quizIds") as unknown as number[]) ?? [];
  console.log(cards);

  const errors = checkAnswer(response);

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return Response.json(
      { errors, wrongStreak: Number(response["wrong-streak"]) + 1 },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      }
    );
  }

  await saveUserAnswer(
    params.source,
    params.cardId,
    Number(response["wrong-streak"])
  );

  const nextIndex = cards.indexOf(Number(params.cardId)) + 1;
  if (nextIndex === -1) {
    throw new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

  // quiz is over
  if (nextIndex >= cards.length) {
    return replace("/quiz_review", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  return replace(`/${params.source}/quiz/${cards[nextIndex]}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Quiz() {
  const { card } = useLoaderData<LoaderData>();
  const actionData = useActionData<typeof action>();
  const { errors, wrongStreak } = Object(actionData);

  return (
    <div>
      <FlashcardHeader
        header={card.translations[0]}
        wordType={card.wordType}
        sub={card.translations.slice(1).join(", ")}
      />
      <div className="text-center bg-zinc-800 w-full p-2">
        {card.wordType === "irregular" || card.isIrregularVerb
          ? "irregular"
          : "regular"}
      </div>
      <Form
        key={card.id}
        id="card-form"
        method="post"
        className="flex gap-2 w-full p-2"
      >
        <input type="hidden" name={`type`} value={card.wordType} />
        <input type="hidden" name={`wrong-streak`} value={wrongStreak ?? 0} />
        <FlashcardContent input errors={Object(errors)} card={card} />
        <button type="submit">👉🏻</button>
      </Form>
    </div>
  );
}
