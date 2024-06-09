import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const model = searchParams.get("model");

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: "type" | "model"
  ) => {
    const value = e.target.value;
    const currentPath = `${pathname}?${searchParams.toString()}`;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(filterType, value);

    if (currentPath === `${pathname}?${newSearchParams.toString()}`) {
      return;
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const resetHandler = (filterType: "type" | "model") => {
    const currentPath = `${pathname}?${searchParams.toString()}`;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(filterType);

    if (currentPath === `${pathname}?${newSearchParams.toString()}`) {
      return;
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return {
    changeHandler,
    resetHandler,
    selectedType: type,
    selectedModel: model,
  };
}
