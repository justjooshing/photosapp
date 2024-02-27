import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { router } from "expo-router";

import image from "@/assets/images/image.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";

import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { SortOptions, setImagesCount } from "@/helpers/Images";
import { IImage } from "../context/Images/types";
import MainImageHandler from "@/components/MainImageHandler";
import { useGetImages } from "@/api/query";
import { useImagesContext } from "@/context/Images/Images";

const Images = () => {
  const { setSortedImages } = useImagesContext();

  // Needs to be moved to BE/load from image URLs from GooglePhotos
  const [images, setImages] = useState<IImage[]>([
    { source: image, id: 1 },
    { source: image2, id: 2 },
    { source: image3, id: 3 },
  ]);

  const [main, ...rest] = images;

  const imageUrls = useGetImages();

  useEffect(() => {
    if (imageUrls.data) console.log(imageUrls.data);
  }, [imageUrls]);

  const handleClick = async (choice: SortOptions) => {
    // Also send BE req to put image url into album
    await setImagesCount(choice);
    setSortedImages((prev) => ({
      ...prev,
      [choice]: [...prev[choice], main],
    }));
    setImages(rest);
  };

  const deleteImage = () => handleClick("delete");
  const keepImage = () => handleClick("keep");

  if (!images.length) {
    router.push("/end");
  }

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
