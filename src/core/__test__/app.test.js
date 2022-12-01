import request from "supertest";
import { app } from "../app.js";

describe("app", () => {
  it("test route /", () => {
    expect.assertions(1);

    await request(app)
      .get("/")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
      });
  });
});
