import { useMemo } from "react";

import { io } from "socket.io-client";

import { WS_BASE_URL } from "../constants/env.constants";
import { getFromLocalStorage } from "../utils/localStorage";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return getFromLocalStorage("accessToken");
  }
  return null;
};

export const useWebsocket = ({
  path,
  shouldAuthenticate = true,
  autoConnect = false,
}: {
  path: string;
  shouldAuthenticate?: boolean;
  autoConnect?: boolean;
}) => {
  const socket = useMemo(() => {
    const accessToken = getAuthToken();
    return io(WS_BASE_URL ?? "", {
      autoConnect,
      transports: ["websocket"],
      path,
      auth: shouldAuthenticate
        ? {
            authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    });
  }, [autoConnect, path, shouldAuthenticate]);

  return socket;
};
