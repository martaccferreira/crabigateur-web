import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  replace,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { commitSession, destroySession, getSession } from "~/sessions";
import invariant from "tiny-invariant";
import { Review } from "~/types/cards";
import { convertToReviewsByStageId } from "~/types/utils";

type LoaderData = {
  reviewsByStage: Map<number, Review[]>;
};

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const cards =
    //(session.get("quizIds") as unknown as number[]) ?? [];
    [20, 21, 22, 23, 24];
  console.log(cards);

  const res = await fetch(`http://localhost:8080/v1/api/quiz_summary/1`, );
  const { data } = await res.json();

  return { reviewsByStage: convertToReviewsByStageId(data) };
};

export default function QuizReview() {
  const { reviewsByStage } = useLoaderData<LoaderData>();
  console.log(reviewsByStage);

  return <div></div>;
}
