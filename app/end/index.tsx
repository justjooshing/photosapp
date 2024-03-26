import { Link as ExpoLink } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useGetAlbums, useGetCount } from "@/api/query";
import Button from "@/components/Button";
import Link from "@/components/Link";

const End = () => {
  const albums = useGetAlbums();
  const count = useGetCount();

  if (count.isLoading || count.isFetching) return <Text>loading...</Text>;
  if (count.isError) return <Text>{count.error.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <View style={styles.singleStats}>
          <Text>Photos kept:</Text>
          <Text>{count.data.sortedCount}</Text>
        </View>
        <View style={styles.singleStats}>
          <Text>Photos deleted:</Text>
          <Text>{count.data.deletedCount}</Text>
        </View>
      </View>
      <View>
        {albums.data?.albums.map((album) => {
          const { baseUrl } = album.firstImage;
          const imageSource: ImageSourcePropType = {
            uri: baseUrl,
            height: 200,
            width: 200,
          };

          return (
            <View key={album.id}>
              <ExpoLink href={`/albums/${album.id}`} asChild>
                <Pressable>
                  <Image source={imageSource} />
                  <Text>{album.title}</Text>
                </Pressable>
              </ExpoLink>
            </View>
          );
        })}
      </View>
      <View>
        <Link href="/" copy="Another round?" />
        <Link href="/goodbye" copy="End" />
        <Button copy="Open folder in Google Photos" />
      </View>
    </View>
  );
};

export default End;

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  stats: {
    display: "flex",
    paddingVertical: 250,
  },
  singleStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
});
