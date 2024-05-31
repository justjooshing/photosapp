import { StyleSheet, View } from "react-native";

import DeleteAccount from "./components/delete_account";
import Stats from "./components/stats";

import { Anchor } from "@/tamagui/variants";

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
        <Anchor
          key="/"
          variant="primary"
          size="$medium"
          radius="$medium"
          centered
          href="/"
        >
          Another round?
        </Anchor>
      </View>
      <View style={{ flexDirection: "row", gap: 20, justifyContent: "center" }}>
        <Anchor
          key="/goodbye"
          variant="secondary"
          size="$small"
          radius="$small"
          centered
          href="/goodbye"
        >
          End
        </Anchor>
        <DeleteAccount />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
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
