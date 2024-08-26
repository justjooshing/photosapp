import React, { useState } from "react";

import { useLogout } from "@/api/queries/auth";
import LoadingModal from "@/components/loading_modal";
import { Button } from "@/config/tamagui/variants";

const Logout = () => {
  const logout = useLogout();
  const [showModal, setShowModal] = useState(false);

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
      <LoadingModal
        showModal={showModal}
        setShowModal={setShowModal}
        copy="Logging you out"
        callback={logout.mutate}
      />
    </>
  );
};

export default Logout;
