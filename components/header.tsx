import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { H1 } from "tamagui";

import { useGetSingleAlbum } from "@/api/queries/albums";
import { tokens } from "@/config/tamagui/tokens";
import { useHeadingContext } from "@/context/header";
import { ImagesType } from "@/context/header/types";
import usePathname from "@/hooks/usePathname";

const BackButton = () => {
  const { path, slug } = usePathname();

  const handleBackClick = () => {
    if (router.canGoBack()) {
      return router.back();
    }

    // If no route to go back to, trigger back based on flow
    const backRoute = {
      albums: slug ? "/albums" : "/dashboard",
      dashboard: "/",
    }[path];

    return router.replace(backRoute ? backRoute : "/dashboard");
  };

  return (
    <Pressable onPress={handleBackClick}>
      <AntDesign name="arrowleft" size={24} color={tokens.color.blue4} />
    </Pressable>
  );
};

const Header = () => {
  const {
    pageTitle,
    setPageTitle,
    imageType,
    setImageType,
    currentImageIndex,
    setCurrentImageIndex,
  } = useHeadingContext();
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
      <H1 numberOfLines={1} size={20} color={tokens.color.grey1}>
        {pageTitle}
      </H1>
    );
  };

  const Mode = () => {
    const icons: {
      name: keyof typeof AntDesign.glyphMap;
      option: ImagesType;
    }[] = [
      { name: "picture", option: "similar" },
      { name: "calendar", option: "today" },
      { name: "clockcircleo", option: "oldest" },
    ];
    const updateImageType = (option: ImagesType) => {
      if (currentImageIndex) setCurrentImageIndex(0);
      setImageType(option);
    };

    return path === "" ? (
      <View style={styles.mode_container}>
        {icons.map(({ name, option }) => (
          <Pressable
            key={option}
            onPress={() => updateImageType(option)}
            disabled={imageType === option}
          >
            <AntDesign
              name={name}
              color={
                imageType === option ? tokens.color.blue2 : tokens.color.blue4
              }
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
      <View style={styles.header_side}>
        <BackButton />
      </View>
      <View style={styles.header_center}>
        <Title />
      </View>
      <View style={styles.header_side}>
        <Mode />
      </View>
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
    backgroundColor: tokens.color.blue,
    color: tokens.color.white,
  },
  header_side: {
    flex: 1,
  },
  header_center: {
    flex: 2,
    alignItems: "center",
  },
  mode_container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
  },
  mode_placeholder: {
    width: 24,
  },
});
