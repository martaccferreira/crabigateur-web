export enum WORD_TYPE {
  Regular = "regular",
  Irregular = "irregular",
  Verb = "verb",
}

export enum WORD_FLEX {
  Masculine = "m",
  Feminine = "f",
  MasculineSingular = "m.s.",
  MasculinePlural = "m.p.",
  FeminineSingular = "f.s.",
  FemininePlural = "f.p.",
}

export enum VERB_FLEX {
  Present = "present",
}

export type Verb = Map<VERB_FLEX, string[]>;

export type Form = Map<WORD_FLEX, string[]>;

export type Card = {
  id: number;
  level: number;
  wordType: WORD_TYPE;
  translations: string[];
  word: string;
  gender: WORD_FLEX;
  forms: Verb | Form;
  isIrregularVerb: boolean;
};

export type Review = {
  id: number;
  word: string;
  success: boolean;
  stageId?: number;
};
