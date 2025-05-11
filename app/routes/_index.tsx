import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import lesson from "../images/lesson_img.png";
import review from "../images/reviews_img.png";
import crab from "../../public/favicon.ico";

export const meta: MetaFunction = () => {
  return [
    { title: "crabigateur" },
    { name: "description", content: "Your crabigateur dashboard!" },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.ico",
      type: "image/png",
    },
  ];
};

export default function Index() {
  return (
    <>
      <header className="sticky">
        <div className="backdrop" />
        <div className="flex flex-row relative p-4 border-b border-slate-800 text-xl font-mono">
          crabi
          <img src={crab} width="30" height="30" />
          gateur
        </div>
      </header>
      <div className="py-4 font-mono">
        <div className="grid max-w-5xl mx-auto">
          <div className="flex gap-8">
            <div className="bg-peachier rounded p-6 w-full text-xl">
              <div className="flex flex-row justify-between overflow-x-scroll">
                <div className="flex flex-col mr-4 justify-between">
                  <h2 className="font-bold text-2xl mt-8">Lessons</h2>
                  <p className="text-sm">
                    No time to waste. Learn these new items.
                  </p>
                  <div className="bg-white rounded text-peachier p-2 text-base text-center">
                    <Link to={`lesson`}>Start Lessons</Link>
                  </div>
                </div>
                <img src={lesson} width="300" height="300" />
              </div>
            </div>

            <div className="bg-turquoise rounded p-6 w-full text-xl">
              <div className="flex flex-row justify-between overflow-x-scroll">
                <div className="flex flex-col mr-4 justify-between">
                  <h2 className="font-bold text-2xl mt-8">Reviews</h2>
                  <p className="text-sm">
                    Mastery? Only with practice. Get some reviews in.
                  </p>
                  <div className="bg-white rounded text-turquoise p-2 text-base text-center">
                    <Link to={`review`}>Start Reviews</Link>
                  </div>
                </div>
                <img src={review} width="300" height="300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
