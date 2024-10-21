import { z } from "zod";

export class SignInCredentialsEntity {
  email: string;
  password: string;
}

export const SignInCredentialsSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Not a valid email"),
  password: z.string({
    required_error: "Password is required",
  }),
});