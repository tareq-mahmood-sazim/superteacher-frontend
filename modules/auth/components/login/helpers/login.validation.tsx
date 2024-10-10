import { z } from "zod";

import { PASSWORD_REGEX } from "@/shared/constants/module.constants";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .regex(PASSWORD_REGEX, { message: "Password must contain at least one letter and one number" }),
});
