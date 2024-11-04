import React from "react";

import CreateClassroomComponent from "@/modules/dashboard/components/teacher";

import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import DashboardLayout from "@/shared/layout/dashboard.layout";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

const TeacherDashboard = () => (
  <DashboardLayout>
    <div className="flex flex-col m-auto p-auto justify-center items-center h-screen">
      <CreateClassroomComponent />
    </div>
  </DashboardLayout>
);

const GuardComponent = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard allowedRoles={[EUserRole.TEACHER]}>{children}</AuthGuard>
);

GuardComponent.displayName = "TeacherDashboardGuard";
TeacherDashboard.Guard = GuardComponent;

export default TeacherDashboard;
