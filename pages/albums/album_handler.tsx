import Albums from "./albums";

import { useGetCount } from "@/api/images/queries";
import { SortOptions } from "@/api/types";
import TabView from "@/components/tab_view";
import { useAlbumsContext } from "@/context/albums";

const options = ["Clean up", "All Sorted"];

const routes = (counts: (string | number)[]) =>
  options.map((val, index) => ({
    key: val,
    title: `${val} (${counts[index]})`,
  }));

const renderScene = ({ route }) =>
  route.key === options[0] ? (
    <Albums sortOption={SortOptions.DELETE} />
  ) : (
    <Albums sortOption={SortOptions.KEEP} />
  );

const AlbumsHandler = () => {
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

export default AlbumsHandler;
