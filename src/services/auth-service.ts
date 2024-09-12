import { z } from "zod";
import { prisma } from "../libs/db";
import { RegisterSchema, LoginSchema } from "../schemas/auth-schema";
import { hashPassword, verifyPassword } from "../libs/password";
import { createToken } from "../libs/jwt";

export async function register(body: z.infer<typeof RegisterSchema>) {
  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (user) {
    throw new Error("Username already exists");
  }

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: {
        create: {
          hash: await hashPassword(body.password),
        },
      },
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
    },
  });

  return { success: true, user: newUser };
}

export async function login(body: z.infer<typeof LoginSchema>) {
  const user = await prisma.user.findUnique({
    where: { username: body.username },
    include: { password: true },
  });

  if (!user?.password) {
    throw new Error("Username or password is incorrect");
  }

  if (!(await verifyPassword(user.password.hash, body.password))) {
    throw new Error("Username or password is incorrect");
  }

  return await createToken(user.id);
}

export async function getUserProfile(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        events: true,
        participants: {
          include: {
            event: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
