/*
  Warnings:

  - You are about to drop the `BankAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_account_number_fkey";

-- DropTable
DROP TABLE "BankAccount";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "User";
