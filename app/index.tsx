import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { router } from "expo-router";

import image from "@/assets/images/image.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";

import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { SortOptions, setImagesCount } from "@/helpers/Images";
import { IImage } from "./types";
import UpcomingImage from "@/components/UpcomingImages";
import MainImageHandler from "@/components/MainImageHandler";
import { useGetImages } from "@/api/query";

const Images = () => {
  const [images, setImages] = useState<IImage[]>([
    { source: image, id: 1 },
    { source: image2, id: 2 },
    { source: image3, id: 3 },
  ]);
  const [main, ...rest] = images;

  // This cant stay here because we lose it once the component dismounts
  const [sortedImages, setSortedImages] = useState<{
    keep: IImage[];
    delete: IImage[];
  }>({ keep: [], delete: [] });

  const imageUrls = useGetImages();

  useEffect(() => {
    console.log(imageUrls.data);
  }, [imageUrls]);

  const handleClick = (image: IImage) => async (choice: SortOptions) => {
    await setImagesCount(choice);
    setSortedImages((prev) => ({
      ...prev,
      [choice]: [...prev[choice], image],
    }));
    setImages(rest);
  };

  const clickImage = handleClick(main);
  const deleteImage = async () => clickImage("delete");
  const keepImage = async () => clickImage("keep");

  {
    /* 
      Gesture handler
       Main image
      /gesture handler
  
      AnimatedView style={shift across when main image is being swiped}
      images
       1
       2
       3
      /AnimatedView
       */
  }

  if (!images.length) {
    router.push("/end");
  }

  return (
    <SafeAreaView style={styles.view}>
      {/* <View>
        <MainImageHandler
          mainImage={main}
          swipe={{ up: keepImage, down: deleteImage }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            maxHeight: "30%",
            maxWidth: "100%",
          }}
        >
          {rest.map((image) => (
            <UpcomingImage key={image.id} source={image.source} />
          ))}
        </View>
      </View> */}
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
