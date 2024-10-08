import React from "react";
import { StyleSheet } from "react-native";
import {
  NavigationState,
  TabBar as RNTabBar,
  SceneRendererProps,
} from "react-native-tab-view";

import { tokens } from "@/config/tamagui/tokens";

type Props = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
  }>;
};

const TabBar = (props: Props) => (
  <RNTabBar
    {...props}
    activeColor={tokens.color.blue}
    inactiveColor={tokens.color.white}
    labelStyle={styles.labelStyle}
    indicatorContainerStyle={styles.indicatorContainerStyle}
    indicatorStyle={styles.indicatorStyle}
  />
);

export default TabBar;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: tokens.fontSize[1],
  },
  indicatorContainerStyle: {
    backgroundColor: tokens.color.grey3,
  },
  indicatorStyle: {
    height: "100%",
    backgroundColor: tokens.color.white,
  },
});
