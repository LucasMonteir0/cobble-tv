import { z } from "zod";

export interface CreateUserEntity {
  email: string;
  username: string;
  password: string;
  picture: Express.Multer.File;
  colorHex: string | null;
  confirmPassword: string;
}

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5000000;

export const CreateUserSchema = z
  .object({
    username: z.string({
      required_error: "Username is required",
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
