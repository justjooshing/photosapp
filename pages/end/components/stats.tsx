import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useGetCount } from "@/api/query";
import Skeleton from "@/components/skeleton";

const Stats = () => {
  const count = useGetCount();

  if (count.isError) return <Text>{count.error.message}</Text>;

  const counts = {
    sorted: {
      label: "kept:",
      value: count.data?.counts.sortedCount,
    },
    deleted: {
      label: "deleted:",
      value: count.data?.counts.deletedCount,
    },
  };

  return (
    <View style={styles.stats}>
      {Object.values(counts).map(({ label, value }) => (
        <View style={styles.singleStats} key={label}>
          <Text>{`Photos ${label}`}</Text>
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
