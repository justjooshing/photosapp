import React, { Dispatch, SetStateAction, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { H1 } from "tamagui";

import LoadingModal from "@/components/loading_modal";
import { tokens } from "@/config/tamagui/tokens";
import { Button } from "@/config/tamagui/variants";
import { errorMessageLookup } from "@/server/errors";
import { useDeleteUser } from "@/server/users/mutations";

type Props = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<Props["modalOpen"]>>;
};

const DeleteAccountModal = ({ modalOpen, setModalOpen }: Props) => {
  const [deleteTextValue, setDeleteTextValue] = useState("");
  const deleteUser = useDeleteUser();

  const textToMatch = "delete";
  const buttonDisabled = deleteTextValue?.toLowerCase().trim() !== textToMatch;

  const handleDeleteAccount = async () => {
    if (!buttonDisabled) {
      // Undefined because we're not expecting an arg1 but still want to access the onSuccess callback
      deleteUser.mutate(undefined, {
        onSuccess: () => {
          setDeleteTextValue("");
        },
      });
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setDeleteTextValue(undefined);
  };

  return (
    <>
      <Modal
        visible={modalOpen}
        transparent
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modal_wrapper}>
          <View style={styles.content_wrapper}>
            <View style={styles.content}>
              <H1 fontSize={22}>Confirm account deletion</H1>
              <View>
                <Text>
                  To permanently delete your account, please type
                  <Text style={styles.delete_text}> {textToMatch} </Text>
                  below
                </Text>
              </View>
              <TextInput
                placeholder="Input text here"
                placeholderTextColor={tokens.color.grey3}
                inputMode="text"
                onChangeText={setDeleteTextValue}
                onSubmitEditing={handleDeleteAccount}
                style={styles.input}
              />
              {deleteUser.isError && (
                <Text style={styles.input_error}>
                  {errorMessageLookup(deleteUser.error)}
                </Text>
              )}
              <Text>This cannot be undone</Text>
            </View>
            <View style={styles.buttons}>
              <Button
                variant="danger"
                full
                disabled={buttonDisabled}
                size="$1"
                radius="$1"
                onPress={handleDeleteAccount}
              >
                <Button.Text disabled={buttonDisabled}>
                  Permanently delete account
                </Button.Text>
              </Button>
              <Button
                variant="secondary"
                full
                size="$1"
                radius="$1"
                onPress={handleModalClose}
              >
                <Button.Text>Close modal</Button.Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      {deleteUser.isPending && <LoadingModal copy="Deleting your account" />}
    </>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  modal_wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: 700,
  },
  content_wrapper: {
    justifyContent: "space-between",
    backgroundColor: tokens.color.white,
    borderRadius: 20,
    padding: 20,
    height: "auto",
    width: "100%",
    maxWidth: "80%",
    borderColor: tokens.color.black,
    borderStyle: "solid",
    borderWidth: 1,
  },
  content: { gap: 10 },
  delete_text: {
    fontWeight: "700",
  },
  input: {
    borderColor: tokens.color.black,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
  },
  input_error: { color: tokens.color.red, fontWeight: "600" },
  buttons: {
    paddingTop: 10,
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },
});
