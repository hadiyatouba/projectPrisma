/*
  Warnings:

  - A unique constraint covering the columns `[name,idPost]` on the table `tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tags_name_idPost_key` ON `tags`(`name`, `idPost`);
