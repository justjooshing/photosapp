import React from "react";

import { useLogout } from "@/server/auth/mutations";
import LoadingModal from "@/components/loading_modal";
import { Button } from "@/config/tamagui/variants";

const Logout = () => {
  const logout = useLogout();

  return (
    <>
      <Button variant="secondary" size="$1" radius="$1" onPress={logout.mutate}>
        <Button.Text>Log out</Button.Text>
      </Button>
      {logout.isPending && <LoadingModal copy="Logging you out" />}
    </>
  );
};

export default Logout;
