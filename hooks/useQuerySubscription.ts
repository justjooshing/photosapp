import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { createSocket } from "@/api/axios";
import { Keys } from "@/api/keys";

/**
 * Connect to Socket.io
 */
export const useSocketRQSubscription = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const socket = createSocket();

    socket.on("connect_error", () => {
      console.error("Socket connection error");
    });

    socket.onAny((event, data) => {
      // force query refetch when server says to
      if (event === "db_updated") {
        const queryKey = {
          sizes_updated: Keys.count,
        }[data.message];

        if (queryKey) {
          queryClient.cancelQueries({ queryKey });
          queryClient.invalidateQueries({ queryKey });
        }
      }
    });

    return function didUnmount() {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [queryClient]);
};
