import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { H1 } from "tamagui";

import { useGetSingleAlbum } from "@/api/queries/albums";
import { tokens } from "@/config/tamagui/tokens";
import { useHeadingContext } from "@/context/header";
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
  const { pageTitle, setPageTitle, imageType } = useHeadingContext();
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

  return (
    <View style={styles.header}>
      <View style={styles.header_side}>
        <BackButton />
      </View>
      <View style={styles.header_center}>
        <Title />
      </View>
      <View style={styles.header_side} />
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
});
