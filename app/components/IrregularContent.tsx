import { PropsWithChildren } from "react";
import { WORD_FLEX } from "~/types/cards";
import WordContent from "./WordContent";

type Props = {
  forms: Map<WORD_FLEX, string[]>;
  input?: boolean;
  errors?: { [k: string]: string };
};

const IrregularContent: React.FC<PropsWithChildren<Props>> = ({
  input,
  forms,
  errors = {},
}) => {
  return (
    <div className="w-full grid grid-cols-2 grid-rows-2 gap-2 grid-flow-col">
      {[...forms.keys()]
        .sort()
        .reverse()
        .map((gender) => (
          <WordContent key={gender} gender={gender}>
            {input ? (
              <>
                <input
                  className={`w-full text-center p-2 ${
                    errors[gender] && "wrong-answer"
                  }`}
                  aria-label="Your Response"
                  name={gender}
                  placeholder="Your Response"
                  type="text"
                />
                <input
                  type="hidden"
                  name={`${gender}-correct`}
                  value={forms.get(gender)}
                />
              </>
            ) : (
              forms.get(gender)
            )}
          </WordContent>
        ))}
    </div>
  );
};

export default IrregularContent;
