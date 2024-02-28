import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { router } from "expo-router";

import Button from "@/components/Button";
import { SortOptions, setImagesCount } from "@/helpers/Images";
import MainImageHandler from "@/components/MainImageHandler";
import { useGetImages, useMutateImages } from "@/api/query";
import { useImagesContext } from "@/context/Images/Images";

const Images = () => {
  const { setSortedImages } = useImagesContext();

  // Needs to be moved to BE/load from image URLs from GooglePhotos

  const imageUrls = useGetImages();
  const { mutate: sortImage } = useMutateImages();

  if (imageUrls.isLoading) return <Text>loading...</Text>;
  if (imageUrls.isError) return <Text>{imageUrls.error.message}</Text>;
  if (!imageUrls?.data?.length) return <Text>No data</Text>;

  const [main, ...rest] = imageUrls.data;

  const handleClick = async (choice: SortOptions) => {
    // Also send BE req to put image url into album
    await setImagesCount(choice);
    sortImage({ image: main, choice });
    setSortedImages((prev) => ({
      ...prev,
      [choice]: [...prev[choice], main],
    }));
    if (!rest?.length) {
      router.push("/end");
    }
  };

  const deleteImage = () => handleClick("delete");
  const keepImage = () => handleClick("keep");

  return (
    <SafeAreaView style={styles.view}>
      <MainImageHandler
        mainImage={main}
        swipe={{
          up: keepImage,
          down: deleteImage,
        }}
      />
      <View style={styles.ctas}>
        <Button copy="keep" onClick={keepImage} />
        <Button copy="delete" onClick={deleteImage} />
      </View>
    </SafeAreaView>
  );
};

export default Images;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  ctas: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
