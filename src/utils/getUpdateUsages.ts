import { Usag, UsagWithSort } from "@/types";

function formattedDate(dateString: string) {
  const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  if (regex.test(dateString)) {
    return dateString.replace(regex, "$3.$2.$1");
  }

  return dateString;
}

export function getUpdateUsages(usages: Usag[]): UsagWithSort[] {
  const usageMap = usages.reduce((map, usage) => {
    const key = `${usage.type}-${usage.model}-${usage.created_at}`;
    const existingUsage = map.get(key);
    if (existingUsage) {
      existingUsage.usage_input += usage.usage_input;
      existingUsage.usage_output += usage.usage_output;
    } else {
      map.set(key, {
        type: usage.type,
        model: usage.model,
        created_at: usage.created_at,
        created_at_for_sort: formattedDate(usage.created_at),
        usage_input: usage.usage_input,
        usage_output: usage.usage_output,
      });
    }
    return map;
  }, new Map<string, UsagWithSort>());

  const reducedUsages = Array.from(usageMap.values()).sort((a, b) =>
    a.created_at_for_sort.localeCompare(b.created_at_for_sort)
  );

  return reducedUsages;
}
