import { prisma } from "../config/database.js";
import { user } from "./../schemas/authSchema.js";

export async function findByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email: email },
  });
}

export async function insert(user: user) {
  delete user.passwordConfirmation;
  return prisma.users.create({
    data: user
  });
}