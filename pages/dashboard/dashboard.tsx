import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import DeleteAccount from "./components/delete_account";
import Logout from "./components/logout";
import Stats from "./components/stats";

import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { useRefetchAllImages } from "@/server/images/mutations";

const copy = {
  sort: "Another round?",
  refetch: {
    heading: "Recently added images from the past?",
    explainer: "New images are added automatically",
    cta: "Import old images",
  },
};

const Dashboard = () => {
  const refetchImages = useRefetchAllImages();
  const triggerRefetch = () => {
    refetchImages.mutate();
  };

  return (
    <View style={styles.container}>
      <Stats />
      <View style={styles.another_round_container}>
        <Button
          variant="primary"
          size="$3"
          radius="$2"
          marginVertical="$2"
          width="60%"
        >
          <Link href="/">
            <Button.Text>{copy.sort}</Button.Text>
          </Link>
        </Button>
      </View>
      <View style={styles.refetch_container}>
        <Text style={styles.refetch_container_heading}>
          {copy.refetch.heading}
        </Text>
        <Text>{copy.refetch.explainer}</Text>
        <Button
          variant="secondary"
          size="$1"
          radius="$1"
          onPress={triggerRefetch}
        >
          <Button.Text>{copy.refetch.cta}</Button.Text>
        </Button>
      </View>
      <View style={styles.button_container}>
        <Logout />
        <DeleteAccount />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
  },
  button_container: {
    paddingVertical: 12,
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  refetch_container: {
    alignItems: "center",
    gap: tokens.space[2],
    marginVertical: tokens.space[2],
    padding: tokens.space[2],
    backgroundColor: tokens.color.grey2,
    borderRadius: tokens.radius[2],
  },
  refetch_container_heading: {
    fontSize: tokens.fontSize[2],
  },
  another_round_container: {
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
});
