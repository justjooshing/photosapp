import { useState } from "react";

import DeleteAccountModal from "./delete_account_modal";

import { Button } from "@/config/tamagui/variants";

const DeleteAccount = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button
        variant="danger"
        size="$small"
        radius="$small"
        centered
        onPress={() => setModalOpen(true)}
      >
        <Button.Text>Delete Account</Button.Text>
      </Button>
      <DeleteAccountModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default DeleteAccount;
