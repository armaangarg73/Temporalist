-- CreateTable
CREATE TABLE "EmailInsight" (
    "id" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "summary" TEXT,
    "reply" TEXT,
    "tasks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailInsight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailInsight_emailId_key" ON "EmailInsight"("emailId");
