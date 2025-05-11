import { PropsWithChildren } from "react";
import { WORD_TYPE } from "~/types/cards";

type Props = {
  wordType?: WORD_TYPE;
  isActive?: boolean;
};

const tagColor = (wordType?: WORD_TYPE) => {
  switch (wordType) {
    case WORD_TYPE.Verb:
      return "turquoise";
    case WORD_TYPE.Regular:
    case WORD_TYPE.Irregular:
      return "peachier";
    default:
      return "pale-beige";
  }
};

const WordTag: React.FC<PropsWithChildren<Props>> = ({
  children,
  isActive = false,
  wordType,
}) => {
  const opacity = isActive ? "opacity-45" : "";
  const color = tagColor(wordType);

  return (
    <div className={`${opacity} bg-${color} rounded-sm p-2 text-white w-fit`}>
      {children}
    </div>
  );
};

export default WordTag;
