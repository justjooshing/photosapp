import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { H3 } from "tamagui";

import { useGetCount } from "@/api/query";
import AlbumsList from "@/components/albums_list";

const End = () => {
  const count = useGetCount();

  if (count.isLoading || count.isFetching) return <Text>loading...</Text>;
  if (count.isError) return <Text>{count.error.message}</Text>;
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
        {({ pressed }) => {
          return (
            <Text style={[styles.button_text, pressedStyles(pressed)]}>
              {copy}
            </Text>
          );
        }}
      </Pressable>
    </Link>
  );

  return (
    <>
      <View style={styles.stats}>
        <View style={styles.singleStats}>
          <Text>Photos kept:</Text>
          <Text>{count.data.counts.sortedCount}</Text>
        </View>
        <View style={styles.singleStats}>
          <Text>Photos deleted:</Text>
          <Text>{count.data.counts.deletedCount}</Text>
        </View>
      </View>
      <View style={styles.button_container}>
        {buttons.map(({ href, copy }) => (
          <Button href={href} copy={copy} key={href} />
        ))}
      </View>
      <View style={styles.album_list}>
        <Link href="/albums" asChild style={styles.albums_title}>
          <Pressable>
            <H3>{`Albums >`}</H3>
          </Pressable>
        </Link>
        <AlbumsList limit={6} />
      </View>
    </>
  );
};

export default End;

const styles = StyleSheet.create({
  stats: {
    width: "100%",
    gap: 20,
  },
  singleStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
