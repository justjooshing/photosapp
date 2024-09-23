import { FlashList } from "@shopify/flash-list";
import React from "react";

import Image from "../components/image";

import { useGetSingleAlbum } from "@/api/albums/queries";
import { numColumns } from "@/config/constants";

const Data = () => {
  const singleAlbum = useGetSingleAlbum();

  return (
    <FlashList
      data={singleAlbum.data?.images}
      estimatedItemSize={8}
      keyExtractor={({ id }) => id.toString()}
      numColumns={numColumns}
      renderItem={({ item }) => <Image image={item} />}
    />
  );
};

export default Data;
