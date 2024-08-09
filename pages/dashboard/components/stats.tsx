import React from "react";
import { StyleSheet, Text, View } from "react-native";

import SingleStat from "./single_stat";

import { useGetCount } from "@/api/queries/images";
import ErrorHandler from "@/components/error_handler";
import Skeleton from "@/components/skeleton";
import { tokens } from "@/config/tamagui/tokens";
import { formatBytes } from "@/utils/formatBytes";

const Stats = () => {
  const count = useGetCount();

  if (count.isError) return <ErrorHandler error={count.error} />;

  const fractionDeleted =
    (count.data?.totalDeleted.count + count.data?.markDeleteNotDeleted.count) /
      count.data?.totalSorted.count || 0;

  const averageSizePerImage =
    (Number(count.data?.totalImages.size) || 0) /
    (count.data?.totalImages.count || 0);

  const notYetDeletedCount = count.data?.markDeleteNotDeleted.count;

  return (
    <View style={styles.stats}>
      <View style={styles.section}>
        <SingleStat
          copy="Images deleted"
          stat={count.data?.totalDeleted.count}
          variant="primary"
        />
        <SingleStat
          copy="Space saved"
          stat={formatBytes({
            bytes: Number(count.data?.totalDeleted.size) || 0,
          })}
          variant="primary"
        />
      </View>
      <View style={styles.section}>
        <SingleStat
          variant="secondary"
          copy="Marked to delete but not deleted"
          stat={notYetDeletedCount}
        />
        <SingleStat
          variant="secondary"
          copy="Potential space saving"
          stat={formatBytes({
            bytes: averageSizePerImage * notYetDeletedCount,
          })}
        />
      </View>
      <Text style={styles.summary}>
        You've been deleting{" "}
        {count.isLoading ? (
          <View style={styles.skeleton_container}>
            <Skeleton />
          </View>
        ) : (
          <Text>{(fractionDeleted * 100).toFixed(0)}%</Text>
        )}{" "}
        of your images
      </Text>
      <View style={styles.section}>
        <SingleStat
          variant="secondary"
          stat={formatBytes({
            bytes: Number(count.data?.totalImages.size) || 0,
          })}
          copy="Total size of images on Google"
        />
      </View>
      <View style={styles.section}>
        <SingleStat
          variant="secondary"
          stat={formatBytes({
            bytes:
              (Number(count.data?.totalImages.size) || 0) * fractionDeleted,
          })}
          copy="Overall potential space saving based on keep/delete rate"
        />
      </View>
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
  section: {
    flexDirection: "row",
    paddingVertical: tokens.space[2],
  },
  summary: {
    textAlign: "center",
    fontSize: tokens.fontSize[2],
    backgroundColor: tokens.color.grey4,
    padding: tokens.space[3],
  },
});
