import zod from "zod";
const loginValidateSchema = zod.object({
  email: zod
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "invalid email" })
    .min(3, { message: "email must have 3 characters" })
    .max(200, { message: "its enough" }),
  password: zod
    .string({ required_error: "password is required" })
    .trim()
    .min(8, { message: "password should have 8 character" })
    .max(200, { message: "its enough" }),
});

const validationSchema = loginValidateSchema.extend({
  username: zod
    .string({ required_error: "username is requied" })
    .trim()
    .min(3, { message: "username must be atleast 3 characters" })
    .max(200, { message: "its enough" }),

  phone: zod
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "phone atleast have 10 characters" })
    .max(200, { message: "its enough" }),
});
export { validationSchema, loginValidateSchema };
