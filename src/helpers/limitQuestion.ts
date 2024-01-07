export const limitQuestion = (array: any, index: number) => {
  const newArray = [...array];

  const limitedQuestion = newArray.slice(index, index + 1);

  return limitedQuestion;
};
