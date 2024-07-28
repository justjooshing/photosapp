import { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

import { useGetCount } from "@/api/queries/images";
import Skeleton from "@/components/skeleton";
import { tokens } from "@/config/tamagui/tokens";

type Props = {
  variant: "primary" | "secondary";
  copy: string;
  stat: ReactNode;
};

const SingleStat = ({ variant, copy, stat }: Props) => {
  const count = useGetCount();

  const { copy_style, stat_style } = {
    primary: {
      copy_style: styles.headliner_copy,
      stat_style: styles.headliner_stat,
    },
    secondary: {
      copy_style: styles.secondary_copy,
      stat_style: styles.secondary_stat,
    },
  }[variant];

  return (
    <View style={styles.container}>
      {count.isLoading ? (
        <View style={styles.skeleton_container}>
          <Skeleton />
        </View>
      ) : (
        <Text style={stat_style}>{stat}</Text>
      )}
      <Text style={copy_style}>{copy}</Text>
    </View>
  );
};

export default SingleStat;

const styles = StyleSheet.create({
  skeleton_container: { height: 20, width: 100 },
  container: {
    alignItems: "center",
    flex: 1,
    gap: tokens.space[1],
  },
  headliner_copy: {
    fontSize: tokens.fontSize[2],
  },
  headliner_stat: {
    fontSize: tokens.fontSize[3],
  },

  secondary_copy: {
    fontSize: tokens.fontSize[1],
  },
  secondary_stat: {
    fontSize: tokens.fontSize[2],
  },
});
