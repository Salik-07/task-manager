const request = require("supertest");
const app = require("../src/app");
const { userOne, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  await request(app)
    .post("/api/v1/users")
    .send({
      name: "User",
      email: "user@example.com",
      password: "MyPass777!",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/api/v1/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/api/v1/users/login")
    .send({
      email: "jhon@example.com",
      password: "MyPass777!",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/api/v1/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/api/v1/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/api/v1/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/api/v1/users/me").send().expect(401);
});
