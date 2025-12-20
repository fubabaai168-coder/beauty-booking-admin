-- CreateTable
CREATE TABLE "shop_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "minDailyStaff" INTEGER NOT NULL DEFAULT 2,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shop_settings_pkey" PRIMARY KEY ("id")
);
