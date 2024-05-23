import React, { Dispatch, SetStateAction, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { H1 } from "tamagui";

import { useDeleteUser } from "@/api/queries/users";
import { color } from "@/tamagui/tokens";
import { Button } from "@/tamagui/variants";
type Props = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteAccountModal = ({ modalOpen, setModalOpen }: Props) => {
  const [deleteTextValue, setDeleteTextValue] = useState("");
  const deleteUser = useDeleteUser();

  const textToMatch = "delete";

  const handleDeleteAccount = async () => {
    try {
      await deleteUser.mutateAsync();
      setDeleteTextValue("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      visible={modalOpen}
      transparent
      animationType="slide"
      onRequestClose={() => setModalOpen(false)}
    >
      <View style={styles.modal_wrapper}>
        <View style={styles.content_wrapper}>
          <View style={styles.content}>
            <H1 fontSize={22}>Confirm account deletion</H1>
            <Text>
              To permanently delete your account please type below
              <Text style={styles.delete_text}>{textToMatch}</Text>
            </Text>
            <TextInput
              placeholder="Input text here"
              placeholderTextColor={color.grey6}
              inputMode="text"
              value={deleteTextValue}
              onChangeText={setDeleteTextValue}
              style={styles.input}
            />
            {deleteUser.isError && (
              <Text style={styles.input_error}>{deleteUser.error.message}</Text>
            )}
            <Text>This cannot be undone</Text>
          </View>
          <View style={styles.buttons}>
            <Button
              disabled={deleteTextValue !== textToMatch}
              variant="danger"
              onPress={handleDeleteAccount}
            >
              Permanently delete account
            </Button>
            <Button onPress={() => setModalOpen(false)}>Close modal</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  modal_wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content_wrapper: {
    justifyContent: "space-between",
    backgroundColor: color.white,
    borderRadius: 20,
    padding: 20,
    height: "100%",
    width: "100%",
    maxWidth: "80%",
    maxHeight: "50%",
    borderColor: color.black,
    borderStyle: "solid",
    borderWidth: 1,
  },
  content: { gap: 10 },
  delete_text: { fontWeight: "700", paddingLeft: 5 },
  input: {
    borderColor: color.black,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
  },
  input_error: { color: color.red, fontWeight: "600" },
  buttons: { gap: 20 },
});
