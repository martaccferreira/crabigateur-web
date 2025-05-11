import { LoaderFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import FlashcardHeader from "~/components/FlashcardHeader";
import WordTag from "~/components/WordTag";
import { useKeyboardControls } from "~/hooks/useKeyboardControls";
import { Card } from "~/types/cards";
import FlashcardContent from "~/components/FlashcardContent";
import { convertToCards } from "~/types/utils";
import { commitSession, getSession } from "~/sessions";

type LoaderData = {
  cards: Card[];
  cardIds: number[];
  total: number;
};

export const loader: LoaderFunction = async () => {
  const res = await fetch(
    "http://localhost:8080/v1/api/lessons/1?num_lessons=5"
  );
  const { data } = await res.json();
  return {
    cards: convertToCards(data.cards),
    cardIds: data.card_ids,
    total: data.total,
  };
};

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let formData = await request.formData();
  let cardIds = JSON.parse(formData.get("cardIds") as string);

  session.set("quizIds", cardIds);
  return redirect(`/lesson/quiz/${cardIds[0]}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Lesson() {
  const { cards, cardIds, total } = useLoaderData<LoaderData>();
  const submit = useSubmit();

  const [currentCard, setCurrentCard] = useState<Card>(cards[0]);

  const changeCard = (id: number) => {
    setCurrentCard(cards.find((card) => card.id === id) ?? cards[0]);
  };

  const leftClick = () => {
    setCurrentCard((prevState) => {
      const index = cards.indexOf(prevState);
      if (index - 1 < 0) return prevState;
      return cards[index - 1];
    });
  };

  const rightClick = () => {
    if (currentCard.id === cards[total - 1].id) {
      submit({ cardIds: JSON.stringify(cardIds) }, { method: "post" });
      return;
    }
    setCurrentCard((prevState) => {
      const index = cards.indexOf(prevState);
      return cards[index + 1];
    });
  };

  useKeyboardControls({
    onArrowRight: rightClick,
    onArrowLeft: leftClick,
  });

  return (
    <>
      <nav className="p-2 flex justify-center gap-2">
        {cards.map((card) => (
          <WordTag
            key={card.id}
            wordType={card.wordType}
            isActive={card.id === currentCard.id}
          >
            <button onClick={() => changeCard(card.id)}>{card.word}</button>
          </WordTag>
        ))}
      </nav>
      <FlashcardHeader
        header={currentCard.word}
        wordType={currentCard.wordType}
        sub={currentCard.translations[0]}
      />
      <nav className="flex gap-1 p-1">
        <button onClick={leftClick} className="bg-zinc-800 w-full p-1">
          👈🏻
        </button>
        <button onClick={rightClick} className="bg-zinc-800 w-full p-1">
          👉🏻
        </button>
      </nav>
      <div className="flex flex-row p-8 gap-6 text-pale-beige">
        <section className="basis-1/4">
          <h1 className="border-b p-1 text-2xl">Other Meanings</h1>
          <p className="p-4 text-lg">
            {currentCard.translations.length > 1
              ? currentCard.translations.slice(1).join(", ")
              : ""}
          </p>
        </section>
        <section className="basis-3/4">
          <h1 className="border-b p-1 text-2xl">Details</h1>
          <FlashcardContent card={currentCard} />
        </section>
      </div>
    </>
  );
}
