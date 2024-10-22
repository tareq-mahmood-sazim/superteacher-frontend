import React from "react";

import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import DashboardLayout from "@/shared/layout/dashboard.layout";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

const StudentDashboard = () => (
  <DashboardLayout>
    <h1>Welcome to the Student Dashboard</h1>
  </DashboardLayout>
);

const GuardComponent = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard allowedRoles={[EUserRole.STUDENT]}>{children}</AuthGuard>
);

GuardComponent.displayName = "StudentDashboardGuard";
StudentDashboard.Guard = GuardComponent;

export default StudentDashboard;
