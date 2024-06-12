import { PropsWithChildren, useEffect } from "react";

import { showNotification } from "@mantine/notifications";

import { NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS } from "@/shared/constants/app.constants";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useLazyMeQuery } from "@/shared/redux/rtk-apis/users/users.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { AppInitializerContext } from "./AppInitializerContext";

const AppInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const [getMe, { isFetching, isLoading, error, data, isUninitialized }] = useLazyMeQuery();

  useEffect(() => {
    getMe()
      .unwrap()
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((err) => {
        const errorMessage = parseApiErrorMessage(err);

        showNotification({
          title: "Something went wrong",
          message: errorMessage,
          autoClose: NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS,
          color: "red",
        });
      });
  }, [dispatch, getMe]);

  return (
    <AppInitializerContext.Provider
      value={{
        isLoading: isFetching || isLoading || isUninitialized,
        error,
        user: data,
        getMe,
      }}
    >
      {children}
    </AppInitializerContext.Provider>
  );
};

export default AppInitializer;
