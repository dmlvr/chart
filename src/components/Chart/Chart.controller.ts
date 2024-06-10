import { CostObj, UsagFromChart, UsagWithSort } from "@/types";
import { Props } from "./types";
import { useDebounseWindowSize } from "@/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MOBILE_WIEW_POINT } from "@/const";

export default function useChart({ costs, usages }: Props) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const model = searchParams.get("model");
  const router = useRouter();
  const pathname = usePathname();

  const getCostOfUsages = (usag: UsagWithSort, costs: CostObj) => {
    const cost =
      usag.usage_input * costs[usag.model].input +
      usag.usage_output * costs[usag.model].output;

    return Math.round(cost);
  };

  const windowSize = useDebounseWindowSize();

  const chartSize = {
    width:
      windowSize.width >= MOBILE_WIEW_POINT
        ? windowSize.width - 200
        : windowSize.width - 40,
    height:
      windowSize.width >= MOBILE_WIEW_POINT
        ? windowSize.height - 120
        : windowSize.height - 150,
  };

  const typesSet = new Set<string>();
  const modelsSet = new Set<string>();

  const usageMap = usages.reduce((map, usage) => {
    const key = usage.created_at;
    const existingUsage = map.get(key);

    typesSet.add(usage.type);
    modelsSet.add(usage.model);

    if (type && usage.type !== type) {
      return map;
    }

    if (model && usage.model !== model) {
      return map;
    }

    if (existingUsage) {
      existingUsage.cost_of_usages += getCostOfUsages(usage, costs);
    } else {
      map.set(key, {
        created_at: usage.created_at,
        cost_of_usages: getCostOfUsages(usage, costs),
      });
    }
    return map;
  }, new Map<string, UsagFromChart>());

  const reducedUsages = Array.from(usageMap.values());
  const types = Array.from(typesSet).sort((a, b) => a.localeCompare(b));
  const models = Array.from(modelsSet).sort((a, b) => a.localeCompare(b));

  const resetHandler = () => {
    router.push(pathname);
  };

  return {
    usages: reducedUsages,
    types,
    models,
    windowSize,
    resetHandler,
    chartSize,
  };
}
