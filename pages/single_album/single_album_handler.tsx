import { Dispatch, SetStateAction, useState } from "react";
import { TabBar, TabView } from "react-native-tab-view";

import SingleAlbum from "./single_album";
import { FilterOptions, FilterOptionsType } from "./types";

import { useAlbumsContext } from "@/context/albums";

const options = ["Delete", "Keep", "All"];

const routes = options.map((val) => ({
  key: val,
  title: val,
  icon: val,
}));

const renderScene =
  (setFilter: Dispatch<SetStateAction<FilterOptionsType>>) =>
  ({ route }) =>
    ({
      Delete: (
        <SingleAlbum filter={FilterOptions.DELETE} setFilter={setFilter} />
      ),
      Keep: <SingleAlbum filter={FilterOptions.KEEP} setFilter={setFilter} />,
      All: <SingleAlbum filter={FilterOptions.ALL} setFilter={setFilter} />,
    })[route.key];

const AlbumsHandler = () => {
  const { sortBy } = useAlbumsContext();

  // Initiate as sortBy tab they're on currently
  const [filter, setFilter] = useState<FilterOptionsType>(sortBy);

  const index = Object.values(FilterOptions).indexOf(filter);

  const handleScreenChange = () => {
    setFilter(Object.values(FilterOptions)[index]);
  };

  return (
    <TabView
      renderTabBar={(props) => <TabBar {...props} />}
      navigationState={{ index, routes }}
      renderScene={renderScene(setFilter)}
      onIndexChange={handleScreenChange}
      initialLayout={{ height: 100 }}
    />
  );
};

export default AlbumsHandler;
