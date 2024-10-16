import React from "react";

import { Menu, Button } from "@mantine/core";
import { useSelector } from "react-redux";

import { useLogout } from "@/shared/hooks/useLogout";
import { useLazyProfileQuery } from "@/shared/redux/rtk-apis/profiles/profiles.api";
import { TRootState } from "@/shared/redux/store";

const ProfileDropdownMenu = () => {
  const [getProfile, { data: profile, isFetching, isError }] = useLazyProfileQuery();
  const email = useSelector((state: TRootState) => state.authenticatedUser.email);
  const userId = useSelector((state: TRootState) => state.authenticatedUser.userId);
  const claim = useSelector((state: TRootState) => state.authenticatedUser.claim);

  React.useEffect(() => {
    if (email && userId && claim) {
      getProfile(userId.toString());
    }
  }, [email, userId, claim, getProfile]);

  const { logout } = useLogout();

  if (isFetching) {
    return (
      <Button
        loading
        loaderProps={{ type: "dots" }}
        className="text-white border-white"
        variant="outline"
      />
    );
  }

  if (profile) {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button className="text-white border-white" variant="outline">
            {profile.userProfile.firstName ?? ""}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item component="a" href="/dashboard/home">
            Home
          </Menu.Item>
          <Menu.Item component="a" href="/dashboard/profile">
            About
          </Menu.Item>
          <Menu.Item component="a" href="/dashboard/classrooms">
            Contact
          </Menu.Item>
          <Menu.Item component="button" onClick={logout}>
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  if (isError) {
    return (
      <Button className="text-white border-white" variant="outline">
        Error
      </Button>
    );
  }

  return null;
};

export default ProfileDropdownMenu;
