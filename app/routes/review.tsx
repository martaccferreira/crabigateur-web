import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { commitSession, getSession } from "~/sessions";
import SortableList from "~/components/SortableList";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const response = Object.fromEntries(formData);

  const num = response["num"] as string;
  const sortQuery = Object.entries(response)
    .filter(([key]) => key !== "num")
    .map(([_, value]) => `sort=${value}`)
    .join("&");

  const res = await fetch(
    `http://localhost:8080/v1/api/reviews/1?num_reviews=${num}&${sortQuery}`
  );
  const { data } = await res.json();

  console.log(data);

  return redirect(`/review/quiz`);
}

export default function Review() {
  const sortOptions = [
    {
      id: "level",
      element: (
        <select className={`text-center p-2 w-full`} name="level">
          <option value="level_asc">Lowest level first</option>
          <option value="level_desc">Highest level first</option>
        </select>
      ),
    },
    {
      id: "date",
      element: (
        <select className={`text-center p-2 w-full`} name="date">
          <option value="date_asc">Oldest first</option>
          <option value="date_desc">Newest first</option>
        </select>
      ),
    },
  ];

  return (
    <div className="flex h-screen justify-center items-center">
      <Form
        key={"review"}
        id="review-settings"
        method="post"
        className="flex flex-col border-2 border-turquoise rounded p-4 gap-4"
      >
        <input
          className={`text-center p-2`}
          aria-label="Number of Reviews"
          name="num"
          placeholder="50"
          type="number"
          defaultValue={50}
        />
        <SortableList itemsList={sortOptions} />
        <button type="submit">👉🏻</button>
      </Form>
    </div>
  );
}
