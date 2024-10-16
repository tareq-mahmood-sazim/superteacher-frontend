import { Button } from "@mantine/core";

import CreateClassModal from "./components/createClass/createClassModal";
import ProfileDropdownMenu from "./components/profileDropdown/profileDropdownButton";
const NavbarComponent = () => (
  <div className="flex flex-row justify-between items-center h-16 shadow-md bg-[#0C0C0C]">
    <div className="flex flex-row items-center mx-4">
      <h1 className="text-[24px]">Superteacher</h1>
    </div>
    <div className="flex flex-row items-center mx-4">
      <Button variant="none" className="text-white border-white mx-[-12px]">
        Dashboard
      </Button>
      <CreateClassModal />
      <ProfileDropdownMenu />
    </div>
  </div>
);

export default NavbarComponent;
