import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import DeleteAccount from "./components/delete_account";
import Stats from "./components/stats";

import { Button } from "@/tamagui/variants";

const Dashboard = () => {
  return (
    <View
      style={{
        width: "100%",
        minHeight: "100%",
        justifyContent: "space-between",
      }}
    >
      <Stats />
      <View style={styles.button_container}>
        <Link href="/">
          <Button variant="primary" size="$medium" radius="$medium" centered>
            Another round?
          </Button>
        </Link>
      </View>
      <View style={{ flexDirection: "row", gap: 20, justifyContent: "center" }}>
        <Link href="/goodbye">
          <Button variant="secondary" size="$small" radius="$small" centered>
            End
          </Button>
        </Link>
        <DeleteAccount />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "none",
  },
  button_container: {
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
  album_list: {
    width: "100%",
  },
  albums_title: { paddingBottom: 10 },
});
