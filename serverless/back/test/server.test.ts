import { app } from "../app";
import * as request from "supertest";
import { expect, describe, test } from "@jest/globals";

describe("Server Testing", () => {
  describe("Test Good Response", () => {
    test("should get word description", async () => {
      const response = await request(app).get("/test");
      expect(response.body[0].definitions).toBeDefined();
      expect(response.body[0].pos).toBeDefined();
      expect(response.body[0].word).toBe("TEST");
    });
    test("should get word by part of speech", async () => {
      const response = await request(app).get("/test/v.");
      expect(response.body[0].definitions).toBeDefined();
      expect(response.body[0].word).toBe("TEST");
      expect(response.body[0].pos).toBe("v.");
    });
  });

  describe("Test Errors", () => {
    test("should get error with bad word", async () => {
      const response = await request(app).get("/testItWord");
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({});
    });
    test("should get error with good word but bad part of speech", async () => {
      const response = await request(app).get("/test/adv.");
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject({});
    });
  });
});
