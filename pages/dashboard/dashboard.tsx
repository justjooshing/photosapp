import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import DeleteAccount from "./components/delete_account";
import Stats from "./components/stats";

import { Button } from "@/tamagui/variants";

const Dashboard = () => (
  <View style={styles.container}>
    <Stats />
    <View style={styles.another_round_container}>
      <Link href="/">
        <Button variant="primary" size="$medium" radius="$medium" centered>
          <Button.Text>Another round?</Button.Text>
        </Button>
      </Link>
    </View>
    <View style={styles.button_container}>
      <Link href="/goodbye">
        <Button variant="secondary" size="$small" radius="$small" centered>
          <Button.Text>End</Button.Text>
        </Button>
      </Link>
      <DeleteAccount />
    </View>
  </View>
);

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    justifyContent: "space-between",
  },
  button_container: { flexDirection: "row", gap: 20, justifyContent: "center" },
  another_round_container: {
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
});
