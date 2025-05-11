import { PropsWithChildren } from "react";
import { WORD_FLEX } from "~/types/cards";

type Props = {
  gender?: WORD_FLEX;
  input?: boolean;
  word?: string;
  errors?: { [k: string]: string };
};

const WordContent: React.FC<PropsWithChildren<Props>> = ({
  children,
  input,
  gender,
  word,
  errors = {},
}) => {
  console.log(errors.gender);
  return (
    <div className="w-full flex items-center gap-2 p-4 text-base">
      {gender &&
        (input ? (
          <>
            <select
              className={`h-full min-w-22 ${errors.gender && "wrong-answer"}`}
              name="gender"
            >
              <option value="m">🧑🏻 masc.</option>
              <option value="f">👩🏻 fem.</option>
            </select>
            <input type="hidden" name="gender-correct" value={gender} />
          </>
        ) : (
          <div
            className={`bg-pale-beige rounded-sm px-2 text-black min-h-6 min-w-11 text-center`}
          >
            {gender}
          </div>
        ))}
      {input ? (
        <>
          <input
            className={`w-full text-center p-2 ${
              errors.word && "wrong-answer"
            }`}
            aria-label="Your Response"
            name="word"
            placeholder="Your Response"
            type="text"
          />
          <input type="hidden" name="word-correct" value={word} />
        </>
      ) : (
        <div className="text-lg">{children}</div>
      )}
    </div>
  );
};

export default WordContent;
