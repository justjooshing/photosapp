import Albums from "./albums";

import { SortOptions } from "@/api/types";
import TabView from "@/components/tab_view";
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

  const handleScreenChange = (newTabIndex: number) => {
    setSortBy(newTabIndex ? SortOptions.KEEP : SortOptions.DELETE);
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleScreenChange}
    />
  );
};

export default AlbumsHandler;
