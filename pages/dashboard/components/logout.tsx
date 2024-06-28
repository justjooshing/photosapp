import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Spinner } from "tamagui";

import { useLogout } from "@/api/queries/auth";
import { color, radius, space } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";

const Logout = () => {
  const logout = useLogout();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
        logout.mutate();
      }, 1000);
    }
  }, [showModal]);

  return (
    <>
      <Button
        variant="secondary"
        size="$1"
        radius="$1"
        onPress={() => setShowModal(true)}
      >
        <Button.Text>Log out</Button.Text>
      </Button>
      <Modal visible={showModal} transparent>
        <View style={styles.modal_container}>
          <View style={styles.modal_inner}>
            <Spinner color="$color.grey1" size="large" />
            <Text style={styles.modal_text}>Logging you out</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Logout;

const styles = StyleSheet.create({
  modal_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal_inner: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius[2],
    backgroundColor: color.grey7,
    opacity: 0.8,
    width: "80%",
    maxWidth: 400,
    height: "30%",
  },
  modal_text: {
    paddingTop: space[2],
    color: color.grey1,
  },
});
