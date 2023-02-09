-- CreateTable

CREATE TABLE
    "User" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "email" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "dni" TEXT NOT NULL,
        "dob" DATETIME NOT NULL,
        "emr" TEXT NOT NULL
    );

-- CreateIndex

CREATE UNIQUE INDEX "user_email_key" ON "user"("email");