import { Card, Review, VERB_FLEX, WORD_FLEX, WORD_TYPE } from "./cards";

export function convertToCard(data: any): Card {
  const forms =
    data.word_type === "verb"
      ? new Map<VERB_FLEX, string[]>(
          Object.entries(data.forms || {}) as [VERB_FLEX, string[]][]
        )
      : new Map<WORD_FLEX, string[]>(
          Object.entries(data.forms || {}) as [WORD_FLEX, string[]][]
        );

  return {
    id: data.card_id,
    level: data.level,
    wordType: data.word_type as WORD_TYPE,
    translations: data.translations,
    word: data.word,
    gender: data.gender as WORD_FLEX,
    forms: forms,
    isIrregularVerb: data.is_irregular_verb,
  };
}

export function convertToCards(dataArray: any[]): Card[] {
  return dataArray.map((element) => convertToCard(element));
}

export function convertToReview(data: any): Review {
  return {
    id: data.id,
    word: data.word,
    success: data.success,
  };
}

export function convertToReviewsByStageId(
  dataArray: any[]
): Map<number, Review[]> {
  const reviewByStageId = new Map<number, Review[]>();
  dataArray.forEach((review) => {
    const stageId = review.stage_id;
    if (!reviewByStageId.has(stageId)) {
      reviewByStageId.set(stageId, []);
    }
    reviewByStageId.get(stageId)?.push(convertToReview(review));
  });
  return reviewByStageId;
}
