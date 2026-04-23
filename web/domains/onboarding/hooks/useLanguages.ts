import { useQuery } from "@tanstack/react-query";
import { fetchLanguages } from "../api";

export function useLanguages() {
  return useQuery({
    queryKey: ["onboarding", "languages"],
    queryFn: fetchLanguages,
    staleTime: Infinity,
  });
}
