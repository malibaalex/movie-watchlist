import "temporal-polyfill/full/global";
import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import { Contract } from "../../prisma/contract";
import contractJson from "../../prisma/contract.json";

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof postgres<Contract>> | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  postgres<Contract>({
    contractJson,
    url: process.env["DATABASE_URL"]!,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
