const getFormattedTimestamp = () => {
  const now = new Date();
  const offsetMinutes = now.getTimezoneOffset();
  const offsetSign = offsetMinutes > 0 ? "-" : "+";
  const absoluteOffsetMinutes = Math.abs(offsetMinutes);
  const hoursOffset = String(Math.floor(absoluteOffsetMinutes / 60)).padStart(
    2,
    "0"
  );
  const minutesOffset = String(absoluteOffsetMinutes % 60).padStart(2, "0");

  const timezoneOffset = `${offsetSign}${hoursOffset}:${minutesOffset}`;
  const localDateTime = now.toISOString().split(".")[0]; // Remove fractional seconds
  return `${localDateTime}${timezoneOffset}`;
};

export const saveUserAnswer = (
  source: string,
  id: string,
  wrongStreak: number
) => {
  const body = {
    reviews: [
      {
        card_id: Number(id),
        review_date: getFormattedTimestamp(),
        success: wrongStreak === 0,
        incorrect_count: wrongStreak,
      },
    ],
  };
  console.log(body);

  return fetch(`http://localhost:8080/v1/api/${source}s/1`, {
    method: source === "lesson" ? "POST" : "PUT",
    body: JSON.stringify(body),
  });
};
