export const buildUrl = (options: {
  amount: string;
  category: string;
  difficulty: string;
  type: string;
}) => {
  const { amount, category, difficulty, type } = options;
  let url = "https://opentdb.com/api.php?";
  if (amount) {
    url += `amount=${amount}&`;
  }

  if (category) {
    url += `category=${category}&`;
  }
  if (difficulty) {
    url += `difficulty=${difficulty}&`;
  }
  if (type) {
    url += `type=${type}`;
  }
  console.log(url);
  return url;
};
