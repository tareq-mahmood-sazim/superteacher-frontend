import { PropsWithChildren, useEffect } from "react";

import { showNotification } from "@mantine/notifications";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import { useLazyMeQuery } from "@/shared/redux/rtk-apis/users/users.api";
import { TRootState } from "@/shared/redux/store";
import { parseApiErrorMessage } from "@/shared/utils/errors";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import { AppInitializerContext } from "./AppInitializerContext";
const AppInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: TRootState) => state.authenticatedUser);
  const [getMe, { isFetching, isLoading, error, data, isUninitialized }] = useLazyMeQuery();
  useEffect(() => {
    if (!user.email) {
      getMe()
        .unwrap()
        .then((user) => {
          dispatch(
            setUser({
              id: user.id,
              email: user.email,
              claim: user.claim,
              claimId: user.claimId,
            }),
          );
          showNotification(NotificationMessage("Success", "Welcome back"));
        })
        .catch((err) => {
          const errorMessage = parseApiErrorMessage(err);
          setUser({ id: 0, email: "", claim: EUserRole.NONE, claimId: 0 });
          console.error(errorMessage);
        });
    }
  }, [dispatch, getMe, user.email]);

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
