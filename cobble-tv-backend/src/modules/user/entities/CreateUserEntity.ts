import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;
export interface CreateUserEntity {
  email: string;
  username: string;
  password: string;
  picture: Express.Multer.File;
  colorHex: string | null;
  confirmPassword: string;
}

export const CreateUserSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(3, "Username must have at least 3 characters")
      .max(16, "Username can't have more than 16 characters")
      .regex(/^[a-zA-Z0-9]+$/, {
        message:
          "Username must contain only letters and digits without special characters",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password too short - should be 6 chars minimum"),
    confirmPassword: z.string({
      required_error: "confirmPassword is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    colorHex: z.string().length(7, "colorHex is wrong format - #XXXXXXX"),
    picture: z
      .any()
      // To not allow files other than images
      .refine(
        (file: Express.Multer.File) =>
          ACCEPTED_IMAGE_TYPES.includes(file.mimetype),
        {
          message:
            "Picture: only .jpg, .jpeg, .png and .webp files are accepted.",
        },
      )
      .refine((file: Express.Multer.File) => file.size <= MAX_FILE_SIZE, {
        message: `Max file size is 5MB.`,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
