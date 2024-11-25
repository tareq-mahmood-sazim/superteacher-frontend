import { Button } from "@mantine/core";
import { useSelector } from "react-redux";

import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import { TRootState } from "@/shared/redux/store";

import CreateClassModal from "./components/createClassroom/createClassroomModal";
import ProfileDropdownMenu from "./components/profileDropdown/profileDropdownButton";

const NavbarComponent = () => {
  const claim = useSelector((state: TRootState) => state.authenticatedUser.claim);
  return (
    <div className="flex flex-row justify-between items-center h-16 shadow-md bg-[#0C0C0C]">
      <div className="flex flex-row items-center mx-4">
        <h1 className="text-[24px]">Superteacher</h1>
      </div>
      <div className="flex flex-row items-center mx-4">
        <Button variant="none" className="text-white border-white mx-[-12px]">
          Dashboard
        </Button>
        {claim === EUserRole.TEACHER ? <CreateClassModal buttonLabel="+" /> : null}
        <ProfileDropdownMenu />
      </div>
    </div>
  );
};

export default NavbarComponent;
