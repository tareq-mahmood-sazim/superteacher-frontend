import { HOME_ROUTE, SUPER_USER_DASHBOARD_ROUTE } from "@/shared/constants/route.constants";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

export const getLoginUrlWithRedirectParam = (redirectTo: string) => {
  const url = new URL("/login", window.location.origin);
  url.searchParams.set("redirect", redirectTo);
  return url.toString();
};

export const getDefaultAllowedRolesInLoggedInRoute = (): EUserRole[] => [EUserRole.ADMIN];

export const getRoleBasedDefaultRouteAfterLogin = (role: EUserRole) => {
  switch (role) {
    case EUserRole.SUPER_USER:
      return SUPER_USER_DASHBOARD_ROUTE;
    case EUserRole.ADMIN:
      return HOME_ROUTE;
    default:
      return "/";
  }
};
