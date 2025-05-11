import { PropsWithChildren } from "react";
import { VERB_FLEX } from "~/types/cards";
import WordTag from "./WordTag";

type Props = {
  forms: Map<VERB_FLEX, string[]>;
  input?: boolean;
};

const VerbContent: React.FC<PropsWithChildren<Props>> = ({ input, forms }) => {
  return (
    <section className="flex flex-col p-4 gap-3">
      {[...forms.keys()].map((flex) => (
        <div key={flex} className="flex flex-col gap-2">
          <WordTag>{flex}</WordTag>
          <div className="grid gap-1">
            {forms.get(flex)?.map((person) => {
              return <div key={person}>{person}</div>;
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default VerbContent;
