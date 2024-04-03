import { View } from "react-native";
import { H3 } from "tamagui";

import AlbumsList from "@/components/Albums";

const Albums = () => {
  return (
    <View>
      <H3>All Albums</H3>
      <AlbumsList />
    </View>
  );
};

export default Albums;
