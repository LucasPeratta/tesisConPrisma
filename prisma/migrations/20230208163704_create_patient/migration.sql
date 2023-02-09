-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "dob" DATETIME NOT NULL,
    "emr" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- RedefineIndex
DROP INDEX "user_email_key";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
