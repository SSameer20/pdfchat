-- CreateTable
CREATE TABLE "Document" (
    "Id" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Content" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
