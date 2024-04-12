import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { H1 } from "tamagui";

import { useGetSingleAlbum } from "@/api/query";
import { useHeadingContext } from "@/context/Header";
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
      <AntDesign name="arrowleft" size={24} />
    </Pressable>
  );
};

const Header = () => {
  const { pageTitle, setPageTitle, imageType, setImageType } =
    useHeadingContext();
  const { path, slug } = usePathname();
  const singleAlbum = useGetSingleAlbum(slug);

  useEffect(() => {
    if (path !== "albums") {
      return setPageTitle(undefined);
    }
    if (singleAlbum.data?.title) {
      return setPageTitle(singleAlbum.data.title);
    }
    setPageTitle("All Albums");
  }, [path, slug, singleAlbum]);

  const Title = () => {
    return (
      <H1 numberOfLines={1} size={20}>
        {pageTitle}
      </H1>
    );
  };

  const Mode = () => {
    // Might later be something for dark/light theme switch
    // Currently just placeholding to center 'title'
    const handleChange = () => {
      setImageType((prev) => (prev === "similar" ? "today" : "similar"));
    };
    console.log({ path, imageType });
    return path === "" ? (
      <Switch value={imageType === "similar"} onValueChange={handleChange} />
    ) : (
      <View style={{ width: 24 }} />
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
});
