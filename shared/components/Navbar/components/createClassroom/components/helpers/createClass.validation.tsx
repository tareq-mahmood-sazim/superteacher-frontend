import { z } from "zod";

const createClassSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  classTime: z.string().min(1, { message: "Class time is required" }),
  daysOfTheWeek: z.array(z.string()),
});
export default createClassSchema;
