/*
  Warnings:

  - Made the column `notes` on table `Miscellaneous` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Miscellaneous" ALTER COLUMN "notes" SET NOT NULL;
