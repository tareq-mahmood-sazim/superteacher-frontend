import { useEffect } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import { TRootState } from "@/shared/redux/store";

import Unauthorized from "../../Unauthorized";
import { TAuthGuardProps } from "./AuthGuard.types";
import {
  getDefaultAllowedRolesInLoggedInRoute,
  getLoginUrlWithRedirectParam,
  getRoleBasedDefaultRouteAfterLogin,
} from "./AuthGuard.utils";

const AuthGuard = ({ children, allowedRoles }: TAuthGuardProps) => {
  if (!allowedRoles || allowedRoles.length === 0) {
    allowedRoles = getDefaultAllowedRolesInLoggedInRoute();
  }

  const router = useRouter();
  const user = useSelector((state: TRootState) => state.authenticatedUser);
  const isUnauthenticated = !user.userId;
  const isUnauthorized = user.userId && !allowedRoles.includes(user.claim);

  useEffect(() => {
    if (typeof location === "undefined") return;

    if (isUnauthenticated) {
      const redirectTo = `${location.pathname}${location.search}`;
      router.push(getLoginUrlWithRedirectParam(redirectTo));
    } else if (isUnauthorized) {
      router.push(getRoleBasedDefaultRouteAfterLogin(user.claim ?? EUserRole.NONE));
    }
  }, [router, isUnauthenticated, isUnauthorized, user.claim]);

  if (isUnauthenticated || isUnauthorized) return <Unauthorized />;

  return <>{children}</>;
};

export default AuthGuard;
