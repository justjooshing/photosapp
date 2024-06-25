import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import DeleteAccount from "./components/delete_account";
import Stats from "./components/stats";

import { Button } from "@/config/tamagui/variants";

const Dashboard = () => (
  <View style={styles.container}>
    <Stats />
    <View style={styles.another_round_container}>
      <Link href="/">
        <Button variant="primary" size="$2" radius="$2" centered>
          <Button.Text>Another round?</Button.Text>
        </Button>
      </Link>
    </View>
    <View style={styles.button_container}>
      <Link href="/goodbye">
        <Button variant="secondary" size="$1" radius="$1" centered>
          <Button.Text>Log out</Button.Text>
        </Button>
      </Link>
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
