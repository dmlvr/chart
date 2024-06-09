export type Cost = {
  model: string;
  input: number;
  output: number;
};

export type CostObj = Record<string, Omit<Cost, "model">>;
