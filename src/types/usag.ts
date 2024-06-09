export type Usag = {
  type: string;
  model: string;
  created_at: string;
  usage_input: number;
  usage_output: number;
};

export type UsagWithSort = Usag & {
  created_at_for_sort: string;
};

export type UsagFromChart = {
  created_at: string;
  cost_of_usages: number;
};
