import { useEffect } from "react";

import { useRouter } from "next/router";

import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";

import NavbarComponent from "@/shared/components/Navbar/navbarComponent";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import { TRootState } from "@/shared/redux/store";

export default function Home() {
  const user = useSelector((state: TRootState) => state.authenticatedUser);
  const router = useRouter();

  useEffect(() => {
    if (user.claim === EUserRole.TEACHER) {
      router.push("/dashboard/teacher");
    }
    if (user.claim === EUserRole.STUDENT) {
      router.push("/dashboard/student");
    } else if (!user.claim) {
      router.push("/login");
    }
    setTimeout(() => {
      router.reload();
    }, 4000);
  });

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to your dashboard</h1>
        <Loader color="green" />
      </div>
    </>
  );
}
