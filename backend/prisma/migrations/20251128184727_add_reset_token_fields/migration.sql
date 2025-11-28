-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);
