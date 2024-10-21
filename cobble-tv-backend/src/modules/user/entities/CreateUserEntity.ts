import {z, ZodType} from 'zod';

export interface CreateUserEntity {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export const CreateUserSchema = z.object({
    username: z.string({
        required_error: "Name is required",
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    confirmPassword: z.string({
        required_error: "confirmPassword is required",
    }),
    email: z.string({
        required_error: "Email is required",
    }).email("Not a valid email"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
}) satisfies ZodType<CreateUserEntity>;