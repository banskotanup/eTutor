-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "refreshTokenExpiresAt" TIMESTAMP(3);
