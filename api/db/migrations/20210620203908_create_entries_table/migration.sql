-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('Income', 'Expense');

-- CreateEnum
CREATE TYPE "EntryFrequency" AS ENUM ('NonRecurring', 'Recurring');

-- CreateTable
CREATE TABLE "entries" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "type" "EntryType" NOT NULL,
    "frequency" "EntryFrequency" NOT NULL,
    "entryDate" TIMESTAMPTZ NOT NULL,
    "category" TEXT NOT NULL,
    "recurringFrom" TIMESTAMP(3),
    "recurringTo" TIMESTAMP(3),
    "userId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entries" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
