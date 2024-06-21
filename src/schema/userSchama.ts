import * as z from "zod";

export const UserInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: "password greater than 6 char " }),
  avatar: z.string().optional(),
});

export const signupInput = UserInput.pick({
  email: true,
  password: true,
  name: true,
  avatar: true,
});
export const loginInput = UserInput.pick({
  email: true,
  password: true,
});

export type userInput = z.TypeOf<typeof signupInput>;
