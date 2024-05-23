import { useState } from "react";

import DeleteAccountModal from "./delete_account_modal";

import { Button } from "@/tamagui/variants";

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
        Delete Account
      </Button>
      <DeleteAccountModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default DeleteAccount;
