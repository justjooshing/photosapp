import { Dispatch, SetStateAction, useEffect } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Spinner } from "tamagui";

import { tokens } from "@/config/tamagui/tokens";

type Props = {
  copy: string;
  callback: () => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<Props["showModal"]>>;
};

const LoadingModal = ({ copy, callback, showModal, setShowModal }: Props) => {
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
        callback();
      }, 1000);
    }
  }, [showModal, setShowModal, callback]);

  return (
    <Modal visible={showModal} transparent>
      <View style={styles.modal_container}>
        <View style={styles.modal_inner}>
          <Spinner color="$color.grey1" size="large" />
          <Text style={styles.modal_text}>{copy}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  modal_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal_inner: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: tokens.radius[2],
    backgroundColor: tokens.color.grey7,
    opacity: 0.8,
    width: "80%",
    maxWidth: 400,
    height: "30%",
  },
  modal_text: {
    paddingTop: tokens.space[2],
    color: tokens.color.grey1,
  },
});
