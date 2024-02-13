import { getImagesCount } from "@/helpers/Images";
import Link from "@/components/Link";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";

const End = () => {
  const [count, setCount] = useState<{
    keepCount: number;
    deleteCount: number;
  }>({ keepCount: 0, deleteCount: 0 });

  useEffect(() => {
    (async () => {
      const currentKeptCount = await getImagesCount("keep");
      const currentDeletedCount = await getImagesCount("delete");
      setCount({
        keepCount: currentKeptCount,
        deleteCount: currentDeletedCount,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <View style={styles.singleStats}>
          <Text>Photos kept:</Text>
          <Text>{count.keepCount}</Text>
        </View>
        <View style={styles.singleStats}>
          <Text>Photos deleted:</Text>
          <Text>{count.deleteCount}</Text>
        </View>
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
