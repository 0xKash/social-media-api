-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "github_id" INTEGER,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "avatar" TEXT DEFAULT 'default-avatar',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
