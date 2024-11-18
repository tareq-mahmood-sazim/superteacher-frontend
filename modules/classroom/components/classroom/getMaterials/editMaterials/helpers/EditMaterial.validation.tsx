import { z } from "zod";

export const materialSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  instructions: z.string().min(10, { message: "Instructions must be at least 10 characters long" }),
  dueDate: z.date({ required_error: "Due date is required" }),
  attachments: z.array(z.string()).optional(),
});
