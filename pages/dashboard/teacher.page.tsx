import React from "react";

import TeacherContainer from "@/modules/dashboard/teacher/containers/TeachersContainer";
import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import DashboardLayout from "@/shared/layout/dashboard.layout";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

const TeacherDashboard = () => (
  <DashboardLayout>
    <TeacherContainer />
  </DashboardLayout>
);

const GuardComponent = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard allowedRoles={[EUserRole.TEACHER]}>{children}</AuthGuard>
);

GuardComponent.displayName = "TeacherDashboardGuard";
TeacherDashboard.Guard = GuardComponent;

export default TeacherDashboard;
