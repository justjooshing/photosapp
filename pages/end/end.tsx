import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { H3, Anchor } from "tamagui";

import DeleteAccount from "./components/delete_account";
import Stats from "./components/stats";

import AlbumsList from "@/components/albums_list";

const End = () => {
  const buttons = [
    { href: "/", copy: "Another round?" },
    { href: "/goodbye", copy: "End" },
  ];

  return (
    <>
      <Stats />
      <View style={styles.button_container}>
        {buttons.map(({ href, copy }) => (
          <Anchor href={href} key={href}>
            {copy}
          </Anchor>
        ))}
      </View>
      <View style={styles.album_list}>
        <Link href="/albums" asChild style={styles.albums_title}>
          <Pressable>
            <H3>{"Albums >"}</H3>
          </Pressable>
        </Link>
        <AlbumsList limit={6} />
      </View>
      <DeleteAccount />
    </>
  );
};

export default End;

const styles = StyleSheet.create({
  button_container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
  button: {
    width: "100%",
  },
  button_text: {
    textAlign: "center",
    borderStyle: "solid",
    padding: 10,
    width: "100%",
    marginVertical: 10,
    marginHorizontal: "auto",
    borderWidth: 2,
    borderRadius: 5,
    fontWeight: "700",
  },
  album_list: {
    width: "100%",
  },
  albums_title: { paddingBottom: 10 },
});
