import React from "react";

import StudentContainer from "@/modules/dashboard/student/containers/studentContainer";
import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import DashboardLayout from "@/shared/layout/dashboard.layout";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

const StudentDashboard = () => (
  <DashboardLayout>
    <StudentContainer />
  </DashboardLayout>
);

const GuardComponent = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard allowedRoles={[EUserRole.STUDENT]}>{children}</AuthGuard>
);

GuardComponent.displayName = "StudentDashboardGuard";
StudentDashboard.Guard = GuardComponent;

export default StudentDashboard;
