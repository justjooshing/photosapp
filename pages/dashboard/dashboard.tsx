import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import DeleteAccount from "./components/delete_account";
import Logout from "./components/logout";
import Stats from "./components/stats";

import { Button } from "@/config/tamagui/variants";

const Dashboard = () => (
  <View style={styles.container}>
    <Stats />
    <View style={styles.another_round_container}>
      <Button variant="primary" size="$2" radius="$2">
        <Link href="/">
          <Button.Text>Another round?</Button.Text>
        </Link>
      </Button>
    </View>
    <View style={styles.button_container}>
      <Logout />
      <DeleteAccount />
    </View>
  </View>
);

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  button_container: { flexDirection: "row", gap: 20, justifyContent: "center" },
  another_round_container: {
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
});
