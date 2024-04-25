import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { H1 } from "tamagui";

import { useGetSingleAlbum } from "@/api/query";
import { useHeadingContext } from "@/context/Header";
import { ImagesType } from "@/context/Header/types";
import usePathname from "@/hooks/usePathname";

const BackButton = () => {
  const { path, slug } = usePathname();

  const handleBackClick = () => {
    if (router.canGoBack()) {
      return router.back();
    }

    // If no route to go back to, trigger back based on flow
    const backRoute = {
      albums: slug ? "/albums" : "/end",
      end: "/",
    }[path];

    return router.replace(backRoute ? backRoute : "/end");
  };

  return (
    <Pressable onPress={handleBackClick}>
      <AntDesign name="arrowleft" size={24} color="#ADD8E6" />
    </Pressable>
  );
};

const Header = () => {
  const { pageTitle, setPageTitle, imageType, setImageType } =
    useHeadingContext();
  const { path, slug } = usePathname();
  const singleAlbum = useGetSingleAlbum(slug);

  useEffect(() => {
    if (path === "") {
      return setPageTitle(imageType);
    }
    if (path !== "albums") {
      return setPageTitle(undefined);
    }
    if (singleAlbum.data?.title) {
      return setPageTitle(singleAlbum.data.title);
    }
    setPageTitle("All Albums");
  }, [path, slug, singleAlbum, imageType]);

  const Title = () => {
    return (
      <H1 numberOfLines={1} size={20} color="#ADD8E6">
        {pageTitle}
      </H1>
    );
  };

  const Mode = () => {
    const icons: {
      name: keyof typeof AntDesign.glyphMap;
      option: ImagesType;
    }[] = [
      { name: "calendar", option: "today" },
      { name: "picture", option: "similar" },
      { name: "clockcircleo", option: "oldest" },
    ];

    return path === "" ? (
      <View style={{ flexDirection: "row", gap: 10 }}>
        {icons.map(({ name, option }) => (
          <Pressable
            key={option}
            onPress={() => setImageType(option)}
            disabled={imageType === option}
          >
            <AntDesign
              name={name}
              color={imageType === option ? "#000080" : "#ADD8E6"}
              size={24}
            />
          </Pressable>
        ))}
      </View>
    ) : (
      <View style={styles.mode_placeholder} />
    );
  };

  return (
    <View style={styles.header}>
      <BackButton />
      <Title />
      <Mode />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "blue",
    color: "white",
  },
  mode_placeholder: {
    width: 24,
  },
});
