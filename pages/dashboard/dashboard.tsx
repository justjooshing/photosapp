import { StyleSheet, View } from "react-native";

import DeleteAccount from "./components/delete_account";
import Stats from "./components/stats";

import { Anchor } from "@/tamagui/variants";

const Dashboard = () => {
  const buttons = [
    { href: "/", copy: "Another round?" },
    { href: "/goodbye", copy: "End" },
  ];

  return (
    <>
      <Stats />
      <View style={styles.button_container}>
        {buttons.map(({ href, copy }) => (
          <Anchor
            key={href}
            variant="primary"
            size="$small"
            radius="$small"
            centered
            href={href}
          >
            {copy}
          </Anchor>
        ))}
      </View>
      <DeleteAccount />
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  button_container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
  album_list: {
    width: "100%",
  },
  albums_title: { paddingBottom: 10 },
});
