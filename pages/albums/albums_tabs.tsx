import AlbumsContainer from "./albums_container";

import { useGetCount } from "@/api/images/queries";
import { SortOptions } from "@/api/types";
import TabView from "@/components/tab_view";
import { useAlbumsContext } from "@/context/albums";

const routes = (counts: (string | number)[]) =>
  ["Clean up", "All Sorted"].map((val, index) => ({
    key: SortOptions[index],
    title: `${val} (${counts[index]})`,
  }));

const renderScene = ({ route: { key } }) => (
  <AlbumsContainer sortOption={key} />
);

const AlbumsTabs = () => {
  const { sortBy, setSortBy } = useAlbumsContext();
  const counts = useGetCount();

  type CountOptions = "albumsToDelete" | "albumsKept";
  const getCount = (opt: CountOptions) =>
    counts.isLoading ? "?" : counts.data[opt].count || 0;

  const index = sortBy === SortOptions.KEEP ? 1 : 0;

  const handleScreenChange = (newTabIndex: number) => {
    setSortBy(newTabIndex ? SortOptions.KEEP : SortOptions.DELETE);
  };

  return (
    <TabView
      navigationState={{
        index,
        routes: routes([getCount("albumsToDelete"), getCount("albumsKept")]),
      }}
      renderScene={renderScene}
      onIndexChange={handleScreenChange}
    />
  );
};

export default AlbumsTabs;
