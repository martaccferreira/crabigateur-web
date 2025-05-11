import { Link } from "@remix-run/react";
import { WORD_TYPE } from "~/types/cards";

type Props = {
  header: string;
  wordType: WORD_TYPE;
  sub?: string | string[];
};

const FlashcardHeader: React.FC<Props> = ({ header, wordType, sub }) => {
  const color = wordType === WORD_TYPE.Verb ? "turquoise" : "peachier";

  return (
    <div className={`flex flex-col bg-${color} px-4 gap-2`}>
      <nav className="text-lg pt-2">
        <Link to={"/"}>🏠</Link>
      </nav>
      <div className="place-self-center text-6xl p-2">{header}</div>
      <div className="place-self-center text-2xl pb-8 pt-1">
        {sub ?? <span>&nbsp;</span>}
      </div>
    </div>
  );
};

export default FlashcardHeader;
