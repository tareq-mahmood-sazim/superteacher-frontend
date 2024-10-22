import { z } from "zod";

const createClassSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title is required" })
    .max(50, {
      message: "Title cannot be that long",
    })
    .trim(),
  subject: z
    .string()
    .max(50, {
      message: "Subject cannot be that long",
    })
    .min(2, { message: "Subject is required" })
    .trim(),
  classTime: z.string().min(1, { message: "Class time is required" }),
  daysOfTheWeek: z
    .array(z.string().min(1, { message: "At least one day is required" }))
    .min(1, { message: "At least one day is required" }),
});
export default createClassSchema;
