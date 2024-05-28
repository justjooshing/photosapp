import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useGetCount } from "@/api/queries/images";
import Skeleton from "@/components/skeleton";

const Stats = () => {
  const count = useGetCount();

  if (count.isError) return <Text>{count.error.message}</Text>;

  const counts = {
    markKeep: {
      label: "Marked to keep:",
      value: count.data?.counts.numMarkKeep,
    },
    markKeepLaterDelete: {
      label: "Marked to keep but later deleted:",
      value: count.data?.counts.numMarkKeepLaterDeleted,
    },
    markDelete: {
      label: "Marked to delete:",
      value: count.data?.counts.numMarkDelete,
    },
    markDeleteLaterDelete: {
      label: "Marked to delete and later deleted:",
      value: count.data?.counts.numMarkDeleteLaterDeleted,
    },
    totalSorted: {
      label: "Total sorted",
      value: count.data?.counts.totalSorted,
    },
    totalDeleted: {
      label: "Total deleted",
      value: count.data?.counts.totalDeleted,
    },
  };

  return (
    <View style={styles.stats}>
      {Object.values(counts).map(({ label, value }) => (
        <View style={styles.singleStats} key={label}>
          <Text>{label}</Text>
          <View>
            {count.isLoading ? (
              <View style={styles.skeleton_container}>
                <Skeleton />
              </View>
            ) : (
              <Text>{value}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  skeleton_container: { height: 20, width: 100 },
  stats: {
    width: "100%",
    gap: 20,
  },
  singleStats: {
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
