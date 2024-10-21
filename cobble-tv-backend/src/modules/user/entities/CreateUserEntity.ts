import {z} from 'zod';

export interface CreateUserEntity {
    email: string;
    username: string;
    password: string;
    picture: File;
    colorHex: string;
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
    colorHex: z.string({
        required_error: "colorHex is required",
    }).length(7, 'colorHex is wrong format - #XXXXXXX'),
    picture: z.instanceof(File, {
        message: "Picture must be a file",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
}) satisfies z.infer<typeof CreateUserSchema> as CreateUserEntity;