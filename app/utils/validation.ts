import { WORD_FLEX, WORD_TYPE } from "~/types/cards";

export enum ANSWER_STATUS {
  INCORRECT = "Incorrect",
  EMPTY = "Empty",
}

export const checkAnswer = (response: { [k: string]: FormDataEntryValue }) => {
  const errors: { [k: string]: string } = {};
  const type = response["type"];
  switch (type) {
    case WORD_TYPE.Irregular:
      [
        WORD_FLEX.FeminineSingular,
        WORD_FLEX.FemininePlural,
        WORD_FLEX.MasculineSingular,
        WORD_FLEX.MasculinePlural,
      ].forEach((flex) => {
        if (response[flex] === "") {
          errors[flex] = ANSWER_STATUS.EMPTY;
        } else if (response[flex] !== response[`${flex}-correct`]) {
          errors[flex] = ANSWER_STATUS.INCORRECT;
        }
      });
      return errors;

    case WORD_TYPE.Verb:
    // TODO verb conjudgation check
    default:
      if (response["word"] === "") {
        errors["word"] = ANSWER_STATUS.EMPTY;
      } else if (response["word"] !== response["word-correct"]) {
        errors["word"] = ANSWER_STATUS.INCORRECT;
      }
      if (
        response["gender"] &&
        response["gender"] !== response["gender-correct"]
      ) {
        errors["gender"] = ANSWER_STATUS.INCORRECT;
      }
  }

  return errors;
};
