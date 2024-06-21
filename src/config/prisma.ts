import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient({});

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}

export default prisma;
