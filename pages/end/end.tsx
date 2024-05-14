import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { H3, Button as TamButton } from "tamagui";

import DeleteAccount from "./components/delete_account";
import Stats from "./components/stats";

import { useLogout } from "@/api/queries/auth";
import AlbumsList from "@/components/albums_list";

const End = () => {
  const logout = useLogout();
  const pressedStyles = (isPressed: boolean) => ({
    backgroundColor: isPressed ? "grey" : "white",
    transform: [{ scale: isPressed ? 1.2 : 1 }],
  });

  const buttons = [
    { href: "/", copy: "Another round?" },
    { href: "/goodbye", copy: "End" },
  ];

  const Button = ({ href, copy }: { href: string; copy: string }) => (
    <Link href={href} asChild style={styles.button}>
      <Pressable>
        {({ pressed }) => (
          <Text style={[styles.button_text, pressedStyles(pressed)]}>
            {copy}
          </Text>
        )}
      </Pressable>
    </Link>
  );

  return (
    <>
      <Stats />
      <View style={styles.button_container}>
        {buttons.map(({ href, copy }) => (
          <Button href={href} copy={copy} key={href} />
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
      <TamButton onPress={() => logout.mutate()}>Logout</TamButton>
      <DeleteAccount />
    </>
  );
};

export default End;

const styles = StyleSheet.create({
  button_container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
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
