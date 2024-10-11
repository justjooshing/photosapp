import { SortOptions } from "@/server/types";

export const copy = {
  markAs: (updatedChoice: SortOptions) => `Move to ${updatedChoice}`,
  google: "Delete from",
};

export const imageDetails = (sorted_status: SortOptions) =>
  ({
    [SortOptions.KEEP]: {
      markAsLabel: copy.markAs(SortOptions.DELETE),
      variant: "primary",
      updated_status: SortOptions.DELETE,
    },
    [SortOptions.DELETE]: {
      markAsLabel: copy.markAs(SortOptions.KEEP),
      variant: "secondary",
      updated_status: SortOptions.KEEP,
    },
  })[sorted_status];
