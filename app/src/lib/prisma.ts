import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 7.x 需要 adapter 或 accelerateUrl
// 在開發階段，如果沒有資料庫連接，可以使用 accelerateUrl 或 adapter
// 這裡先使用基本的 PrismaClient，實際部署時需要提供 adapter
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

