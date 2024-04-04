import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { H2 } from "tamagui";

import { useGetSingleAlbum, useUpdateSingleImage } from "@/api/query";
import { ApiImage, SortOptions } from "@/api/types";
import ImageTile from "@/components/ImageTile";

const SingleAlbum = () => {
  const { albumId } = useLocalSearchParams();
  const { mutate: updateImage } = useUpdateSingleImage(`${albumId}`);

  const singleAlbum = useGetSingleAlbum(
    typeof albumId === "string" ? albumId : albumId[0],
  );

  // AlbumId should be a number as a string
  if (isNaN(+albumId) || Array.isArray(albumId)) {
    router.back();
    return;
  }

  if (singleAlbum.isLoading || singleAlbum.isFetching)
    return <Text>loading...</Text>;
  if (singleAlbum.isError) return <Text>{singleAlbum.error.message}</Text>;

  const handleClick = (image: ApiImage, choice: SortOptions) => {
    updateImage({ image, choice });
  };

  const Image = ({ image }: { image: ApiImage }) => (
    <View style={styles.album_item}>
      <Pressable>
        <ImageTile image={image} />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Pressable
          onPress={() => {
            handleClick(image, "keep");
          }}
        >
          <Text>Tick</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            handleClick(image, "delete");
          }}
        >
          <Text>Cross</Text>
        </Pressable>
        <Link href={image.productUrl} asChild>
          <Pressable>
            <Text>Google</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H2 fontSize="$6">{singleAlbum.data.title}</H2>
        <Text>(Tick | Cross | All)</Text>
      </View>
      <FlatList
        data={singleAlbum.data.images}
        keyExtractor={({ id }) => `${id}`}
        numColumns={2}
        contentContainerStyle={styles.album_container}
        renderItem={({ item }) => <Image image={item} key={item.id} />}
      />
    </View>
  );
};

export default SingleAlbum;

const styles = StyleSheet.create({
  container: { width: "100%" },
  album_container: { gap: 20 },
  album_item: {
    minWidth: "50%",
  },
});
