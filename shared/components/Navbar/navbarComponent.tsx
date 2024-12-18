import Link from "next/link";

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
        <h1 className="text-[24px]">
          <Link className="hover:font-bold hover:underline duration-300" href="/">
            Superteacher
          </Link>
        </h1>
      </div>
      <div className="flex flex-row items-center mx-4">
        <Link
          href="/dashboard/home"
          className="text-white border-2 border-white px-2 py-1 rounded-sm"
        >
          Dashboard
        </Link>
        {claim === EUserRole.TEACHER ? <CreateClassModal buttonLabel="+" /> : null}
        <ProfileDropdownMenu />
      </div>
    </div>
  );
};

export default NavbarComponent;
