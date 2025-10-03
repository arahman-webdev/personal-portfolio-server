/*
  Warnings:

  - You are about to drop the column `slug` on the `Blog` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Blog_slug_key";

-- AlterTable
ALTER TABLE "public"."Blog" DROP COLUMN "slug";
