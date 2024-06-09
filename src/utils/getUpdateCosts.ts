import { Cost, CostObj } from "@/types";

export function getUpdateCosts(costs: Cost[]): CostObj {
  const costObj: CostObj = costs.reduce((acc, cost) => {
    const { model, ...costEntry } = cost;

    acc[model] = costEntry;
    return acc;
  }, {} as CostObj);

  return costObj;
}
