import React, { ReactNode } from "react";
import { useWindowDimensions } from "react-native";
import {
  TabView as RNTabView,
  Route,
  SceneRendererProps,
} from "react-native-tab-view";

import TabBar from "./tab_bar";

type RenderSceneProps = (
  props: SceneRendererProps & {
    route: Route;
  },
) => ReactNode;

type Props = {
  navigationState: {
    index: number;
    routes: Route[];
  };
  renderScene: RenderSceneProps;
  onIndexChange: (newTabIndex: number) => void;
};

const TabView = ({ navigationState, renderScene, onIndexChange }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <RNTabView
      renderTabBar={(props) => <TabBar {...props} />}
      navigationState={navigationState}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      initialLayout={{ width }}
    />
  );
};

export default TabView;
