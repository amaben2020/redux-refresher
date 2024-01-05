type TOptions = {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
};

export const buildUrl = (options: TOptions) => {
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

  return url;
};
