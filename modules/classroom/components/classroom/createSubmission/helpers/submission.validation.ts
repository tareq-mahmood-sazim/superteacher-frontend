import { z } from "zod";

export const submissionSchema = z.object({
  materialId: z
    .number()
    .min(1, "Material ID is required")
    .int("Material ID must be an integer")
    .positive("Material ID must be positive"),
  userId: z
    .number()
    .min(1, "User ID is required")
    .int("User ID must be an integer")
    .positive("User ID must be positive"),
  attachment: z
    .array(z.any())
    .min(1, "At least one attachment is required")
    .max(5, "You can only upload up to 5 files"),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;
