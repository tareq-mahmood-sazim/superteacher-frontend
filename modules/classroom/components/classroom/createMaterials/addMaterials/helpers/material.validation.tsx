import { z } from "zod";

export const MaterialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  instructions: z.string().min(1, "Instructions are required"),
  dueDate: z.date().optional(),
  attachments: z.array(z.any()).optional(),
});
