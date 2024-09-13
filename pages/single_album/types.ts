import { SortOptions } from "@/api/types";

export const FilterOptions = { ...SortOptions, ALL: "all" } as const;
export type FilterOptionsType =
  (typeof FilterOptions)[keyof typeof FilterOptions];
