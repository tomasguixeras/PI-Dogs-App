/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Breed, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
  height: 15,
  weight: 20,
};

describe("Breed routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Breed.sync({ force: true }).then(() => Breed.create(dog)));
  describe("GET /api/dogs", () => {
    it("should get 200", () => agent.get("/api/dogs").expect(200));
  });
});
