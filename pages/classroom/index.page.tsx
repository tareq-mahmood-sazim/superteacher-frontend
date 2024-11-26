import React from "react";

import ClassroomContainer from "@/modules/classroom/containers/classroomContainer/ClassroomContainer";
import AuthGuard from "@/shared/components/wrappers/AuthGuard";
import DashboardLayout from "@/shared/layout/dashboard.layout";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

const Classroom = () => (
  <DashboardLayout>
    <ClassroomContainer />
  </DashboardLayout>
);

const GuardComponent = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard allowedRoles={[EUserRole.STUDENT, EUserRole.TEACHER]}>{children}</AuthGuard>
);

GuardComponent.displayName = "ClassroomDashboardGuard";
Classroom.Guard = GuardComponent;

export default Classroom;
