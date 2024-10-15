import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Spinner } from "tamagui";

import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { useSkipAlbum } from "@/server/albums/mutations";
import { useGetImages } from "@/server/images/queries";
import { SkipOptions } from "@/server/types";

const SkipAlbum = () => {
  const images = useGetImages();
  const skipAlbum = useSkipAlbum();

  const handlePress = (skipReason: SkipOptions) => {
    skipAlbum.mutate({ skipReason, firstImageId: images.data?.[0].id });
  };

  return (
    <View style={styles.inaccurate_container}>
      <Text>Does this album have no near duplicates or want to skip it?</Text>
      <View style={styles.buttons}>
        <Button
          disabled={images.isLoading || skipAlbum.isPending}
          variant="secondary"
          size="$1"
          radius="$1"
          margin="$1"
          onPress={() => handlePress(SkipOptions.INACCURATE)}
        >
          {skipAlbum.isPending ? (
            <Spinner />
          ) : (
            <Button.Text>Inaccurate</Button.Text>
          )}
        </Button>
        <Button
          disabled={images.isLoading || skipAlbum.isPending}
          variant="secondary"
          size="$1"
          radius="$1"
          margin="$1"
          onPress={() => handlePress(SkipOptions.SKIP)}
        >
          {skipAlbum.isPending ? <Spinner /> : <Button.Text>Skip</Button.Text>}
        </Button>
      </View>
    </View>
  );
};

export default SkipAlbum;

const styles = StyleSheet.create({
  inaccurate_container: {
    padding: tokens.space[2],
    borderBottomColor: tokens.color.grey2,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
  },
});
