import { z } from "zod";

import { PASSWORD_REGEX } from "@/shared/constants/module.constants";

export const studentFormSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(PASSWORD_REGEX),
  profileInput: z.object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    gender: z.string(),
    role: z.number().int().positive(),
    majorSubject: z.string().optional(),
    educationLevel: z.string().optional(),
    medium: z.string().optional(),
    classLevel: z.string().optional(),
    degree: z.string().optional(),
    major: z.string().optional(),
    semesterOrYear: z.string().optional(),
  }),
});
