const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("/api/categories", () => {
  it("GET 200 - should respond with an array of category objects with properties of slug & description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(4);
        body.forEach((category) => {
          expect(category).toHaveProperty("slug", expect.any(String));
          expect(category).toHaveProperty("description", expect.any(String));
        });
      });
  });
  it("404 - responds with a not found error if there is a typo in the path", () => {
    return request(app).get("/api/cetagories").expect(404);
  });
});

describe("/api/reviews - all reviews", () => {
  it("GET 200 - should respond with an array of review objects with all the appropriate properties", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        console.log(body)
        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(13);
        body.forEach((review) => {
          expect(review).toHaveProperty("review_id", expect.any(Number));
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review).toHaveProperty("review_body", expect.any(String));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("votes", expect.any(Number));
        });
      });
  });
});
