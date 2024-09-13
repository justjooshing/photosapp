import { TabBar, TabView } from "react-native-tab-view";

import Albums from "./albums";

import { SortOptions } from "@/api/types";
import { useAlbumsContext } from "@/context/albums";

const options = ["Clean up", "All Sorted"];

const routes = options.map((val) => ({
  key: val,
  title: val,
}));

const renderScene = ({ route }) =>
  route.key === options[0] ? (
    <Albums sortOption={SortOptions.DELETE} />
  ) : (
    <Albums sortOption={SortOptions.KEEP} />
  );

const AlbumsHandler = () => {
  const { sortBy, setSortBy } = useAlbumsContext();

  const index = sortBy === SortOptions.KEEP ? 1 : 0;

  const handleScreenChange = () => {
    setSortBy(index ? SortOptions.DELETE : SortOptions.KEEP);
  };

  return (
    <TabView
      renderTabBar={(props) => <TabBar {...props} />}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleScreenChange}
      initialLayout={{ height: 100 }}
    />
  );
};

export default AlbumsHandler;
