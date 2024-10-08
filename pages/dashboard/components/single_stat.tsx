import { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

import Skeleton from "@/components/skeleton";
import { TokenColorValues, tokens } from "@/config/tamagui/tokens";
import { useGetCount } from "@/server/images/queries";

type Props = {
  variant: "primary" | "secondary";
  copy: string;
  stat: ReactNode;
  statColor?: TokenColorValues;
};

const SingleStat = ({
  variant,
  copy,
  stat,
  statColor = tokens.color.black,
}: Props) => {
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
        <Text style={[{ color: statColor }, stat_style]}>{stat}</Text>
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
    textAlign: "center",
  },
  headliner_stat: {
    fontSize: tokens.fontSize[3],
  },
  secondary_copy: {
    fontSize: tokens.fontSize[1],
    textAlign: "center",
  },
  secondary_stat: {
    fontSize: tokens.fontSize[2],
  },
});
