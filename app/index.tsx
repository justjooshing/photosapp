import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { useEffect, useState } from "react";
import image from "@/assets/images/image.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";
import { SortOptions, setImagesCount } from "@/helpers/Images";
import Button from "@/components/Button";

const Images = () => {
  const [images, setImages] = useState([image, image2, image3]);
  const [sortedImages, setSortedImages] = useState({ keep: [], delete: [] });

  const handleClick = async (src: string, choice: SortOptions) => {
    await setImagesCount(choice);
    setSortedImages((prev) => ({
      ...prev,
      [choice]: [...prev[choice], src],
    }));
    setImages(images.slice(1));
  };

  useEffect(() => {
    if (!images.length) {
      router.push("/end");
    }
  }, [images]);

  const rndChoice: SortOptions = Math.random() > 0.5 ? "keep" : "delete";
  return (
    <>
      <View>
        <Pressable onTouchEnd={() => handleClick(images[0], rndChoice)}>
          <Image className="w-screen h-4/5" source={images[0]} />
        </Pressable>
      </View>
      <View
        // className="flex"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Button copy="keep" onClick={() => handleClick(images[0], "keep")} />
        <Button
          copy="delete"
          onClick={() => handleClick(images[0], "delete")}
        />
      </View>
    </>
  );
};

export default Images;
