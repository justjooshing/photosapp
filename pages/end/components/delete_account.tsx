import { useState } from "react";
import { Button } from "tamagui";

import DeleteAccountModal from "./delete_account_modal";

const DeleteAccount = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Button /*variant="danger"*/ onPress={() => setModalOpen(true)}>
        Delete Account
      </Button>
      <DeleteAccountModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default DeleteAccount;
