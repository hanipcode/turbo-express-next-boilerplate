import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter valid email" }).min(4, {
    message: "email must be at least 4 characters",
  }),
  password: z
    .string()
    .min(4, { message: "password must be at least 4 characters" }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export default loginSchema;
