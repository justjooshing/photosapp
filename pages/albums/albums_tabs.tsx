import AlbumsContainer from "./albums_container";

import TabView from "@/components/tab_view";
import { useAlbumsContext } from "@/context/albums";
import { useGetCount } from "@/server/images/queries";
import { SortOptions } from "@/server/types";

const routes = (counts: (string | number)[]) =>
  ["Clean up", "All Sorted"].map(
    (val, index) =>
      ({
        key: Object.keys(SortOptions)[index],
        title: `${val} (${counts[index]})`,
      }) as const,
  );

const renderScene = ({ route: { key } }) =>
  ({
    DELETE: <AlbumsContainer sortOption={SortOptions.DELETE} />,
    KEEP: <AlbumsContainer sortOption={SortOptions.KEEP} />,
  })[key];

const AlbumsTabs = () => {
  const { sortBy, setSortBy } = useAlbumsContext();
  const counts = useGetCount();

  type CountOptions = "albumsToDelete" | "albumsKept";
  const getCount = (opt: CountOptions) =>
    !counts.data ? "?" : counts.data[opt].count || 0;

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
