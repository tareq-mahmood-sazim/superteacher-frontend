import { useEffect } from "react";

import { useRouter } from "next/router";

import LoadingComponent from "../../LoadingComponent";
import Unauthorized from "../../Unauthorized";
import { useSessionContext } from "../AppInitializer/AppInitializerContext";
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
  const { isLoading, error, user } = useSessionContext();
  const isUnauthenticated = !isLoading && (error || !user);
  const isUnauthorized = !isLoading && !error && user && !allowedRoles.includes(user.claim);

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (!isLoading && isUnauthenticated) {
      const redirectTo = `${location.pathname}${location.search}`;
      router.push(getLoginUrlWithRedirectParam(redirectTo));
    }
    if (!isLoading && isUnauthorized) {
      router.push(getRoleBasedDefaultRouteAfterLogin(user.claim));
    }
  }, [router, isLoading, error, isUnauthenticated, isUnauthorized, user?.claim]);

  if (isLoading) return <LoadingComponent visible={true} />;

  if (isUnauthenticated || isUnauthorized) return <Unauthorized />;

  return <>{children}</>;
};

export default AuthGuard;
