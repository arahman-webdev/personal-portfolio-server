/*
  Warnings:

  - You are about to drop the column `productId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_productId_fkey";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
