import { Dispatch, SetStateAction, useState } from "react";

import SingleAlbum from "./single_album";
import { FilterOptions, FilterOptionsType } from "./types";

import TabView from "@/components/tab_view";
import { useAlbumsContext } from "@/context/albums";

const routes = Object.values(FilterOptions).map((val) => ({
  key: val,
  title: val,
  icon: val,
}));

const renderScene =
  (setFilter: Dispatch<SetStateAction<FilterOptionsType>>) =>
  ({ route: { key } }) =>
    ({
      delete: (
        <SingleAlbum filter={FilterOptions.DELETE} setFilter={setFilter} />
      ),
      keep: <SingleAlbum filter={FilterOptions.KEEP} setFilter={setFilter} />,
      all: <SingleAlbum filter={FilterOptions.ALL} setFilter={setFilter} />,
    })[key];

const AlbumsHandler = () => {
  const { sortBy } = useAlbumsContext();
  // Initiate as sortBy tab they're on currently
  const [filter, setFilter] = useState<FilterOptionsType>(sortBy);
  const index = Object.values(FilterOptions).indexOf(filter);

  const handleScreenChange = (newTabIndex: number) => {
    setFilter(Object.values(FilterOptions)[newTabIndex]);
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene(setFilter)}
      onIndexChange={handleScreenChange}
    />
  );
};

export default AlbumsHandler;
