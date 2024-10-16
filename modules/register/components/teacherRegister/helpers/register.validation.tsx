import { z } from "zod";

import { PASSWORD_REGEX } from "@/shared/constants/module.constants";

export const teacherFormSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(PASSWORD_REGEX),
  profileInput: z.object({
    uniquecode: z.string().min(1, "Unique code is required."),
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    gender: z.string(),
    role: z.number().int().positive(),
    highestEducationLevel: z.string(),
    majorSubject: z.string().optional(),
    subjectsToTeach: z.array(z.string()).optional(),
  }),
});
