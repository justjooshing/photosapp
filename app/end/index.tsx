import { getImagesCount } from "@/helpers/Images";
import Link from "@/components/Link";
import React, { useEffect, useState } from "react";
import { BackHandler, Pressable, Text, View } from "react-native";
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
    <>
      <View>
        <Text>Photos kept: {count.keepCount}</Text>
        <Text>Photos deleted: {count.deleteCount}</Text>
      </View>
      <Link href="/" copy="Another round?" />
      <Link href="/goodbye" copy="End" />
      <Button copy="Open folder in Google Photos" />
    </>
  );
};

export default End;
