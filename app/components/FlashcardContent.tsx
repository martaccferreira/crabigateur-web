import { Card, WORD_TYPE, Verb as VerbType, Form } from "~/types/cards";
import VerbContent from "./VerbContent";
import IrregularContent from "./IrregularContent";
import WordContent from "./WordContent";

type Props = {
  card: Card;
  input?: boolean;
  errors?: { [k: string]: string };
};

const FlashcardContent: React.FC<Props> = ({
  card,
  input = false,
  errors = {},
}) => {
  switch (card.wordType) {
    case WORD_TYPE.Verb:
      if (input) {
        return (
          <>
            <WordContent input errors={errors} word={card.word} />
            {/*<VerbContent input forms={card.forms as VerbType} /> TODO*/}
          </>
        );
      }
      return <VerbContent forms={card.forms as VerbType} />;

    case WORD_TYPE.Irregular:
      return (
        <IrregularContent
          input={input}
          errors={errors}
          forms={card.forms as Form}
        />
      );

    default:
      return (
        <WordContent
          input={input}
          errors={errors}
          gender={card.gender}
          word={card.word}
        >
          {card.word}
        </WordContent>
      );
  }
};

export default FlashcardContent;
