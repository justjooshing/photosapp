import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "../axios";
import { ENDPOINTS } from "../endpoints";
import { Keys } from "../keys";
import { SkipOptions } from "../types";

import { useImageContext } from "@/context/image";

const skipAlbum = async ({
  firstImageId,
  skipReason,
}: {
  firstImageId: number;
  skipReason: SkipOptions;
}) =>
  client.post(`${ENDPOINTS.get("albums")}/skip`, {
    skip_reason: skipReason,
    first_image_id: firstImageId,
  });

export const useSkipAlbum = () => {
  const { imageType } = useImageContext();

  const queryClient = useQueryClient();
  const queryKey = Keys.images(imageType);

  return useMutation({
    mutationFn: skipAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
