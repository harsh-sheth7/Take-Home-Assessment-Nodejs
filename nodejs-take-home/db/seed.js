const { query } = require("./query");

const createOperators = async () => {
  await query(
    `
            CREATE TABLE IF NOT EXISTS operators (
                id INTEGER PRIMARY KEY NOT NULL
                , "firstName" TEXT
                , "lastName" TEXT NOT NULL
                , "createdAt" DATE DEFAULT CURRENT_TIMESTAMP
            );
        `
  );
};

const createBusinesses = async () => {
  await query(
    `
            CREATE TABLE IF NOT EXISTS businesses (
                id INTEGER PRIMARY KEY NOT NULL
                , "businessName" TEXT NOT NULL
                , "addressLine1" TEXT NOT NULL
                , "addressLine2" TEXT NOT NULL
                , "city" TEXT NOT NULL
                , "state" TEXT NOT NULL
                , "zip" TEXT NOT NULL
            );
        `
  );
};

const createOps = async () => {
  await query(
    `
              CREATE TABLE IF NOT EXISTS ops (
                  id INTEGER PRIMARY KEY NOT NULL
                  , "operatorId" INTEGER NOT NULL
                  , "businessId" INTEGER NOT NULL
                  , "opTitle" TEXT NOT NULL
                  , "pay" DECIMAL(10, 2) NOT NULL
                  , "startTime" DATE NOT NULL
                  , "endTime" DATE NOT NULL
                  , FOREIGN KEY (operatorId) REFERENCES operators(id)
                  , FOREIGN KEY (businessId) REFERENCES businesses(id)
              );
          `
  );
};

const seed = async () => {
  console.log("Seeding...");

  await createOperators();
  await createBusinesses();
  await createOps();

  console.log("Seeding Completed.");
};

module.exports = {
  seed,
};
