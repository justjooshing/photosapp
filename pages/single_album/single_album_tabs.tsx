import { useState } from "react";

import SingleAlbumContainer from "./single_album_container";

import TabView from "@/components/tab_view";
import { FilterOptions, FilterOptionsType } from "@/context/single_album";

const filterValues = Object.values(FilterOptions);

const routes = filterValues.map((val) => ({
  key: val,
  title: val,
}));

const renderScene = ({ route: { key } }) =>
  ({
    [FilterOptions.DELETE]: (
      <SingleAlbumContainer filter={FilterOptions.DELETE} />
    ),
    [FilterOptions.KEEP]: <SingleAlbumContainer filter={FilterOptions.KEEP} />,
    [FilterOptions.ALL]: <SingleAlbumContainer filter={FilterOptions.ALL} />,
  })[key];

const SingleAlbumsTabs = () => {
  // Initiate as sortBy tab they're on currently
  const [filter, setFilter] = useState<FilterOptionsType>(FilterOptions.DELETE);

  const index = filterValues.indexOf(filter);

  const handleScreenChange = (newTabIndex: number) => {
    setFilter(filterValues[newTabIndex]);
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleScreenChange}
    />
  );
};

export default SingleAlbumsTabs;
