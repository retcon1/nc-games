const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const sorted = require("jest-sorted");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("/api/categories", () => {
  it("GET 200 - responds with an array of category objects with properties of slug & description", () => {
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

describe("/api/reviews/:review_id", () => {
  it("GET 200 - responds with a review object containing all the appropriate properties", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toBeInstanceOf(Object);
        expect(review.review_id).toBe(2);
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
  it("404 - responds with an error if given an ID that does not exist", () => {
    return request(app)
      .get("/api/reviews/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "ID Not Found" });
      });
  });
  it("400 - responds with an error if given an ID that is not a number", () => {
    return request(app)
      .get("/api/reviews/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Invalid ID" });
      });
  });
});

describe("/api/reviews", () => {
  it("GET 200 - should respond with an array of review objects with all the appropriate properties", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeInstanceOf(Array);
        expect(reviews).toHaveLength(13);
        reviews.forEach((review) => {
          expect(review).toHaveProperty("review_id", expect.any(Number));
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("votes", expect.any(Number));
          expect(review).toHaveProperty("comment_count", expect.any(Number));
          if (review.review_id === 3) expect(review.comment_count).toBe(3);
        });
        expect(reviews).toBeSortedBy("created_at", { descending: true });
      });
  });
  it("404 - responds with a not found error if there is a typo in the path", () => {
    return request(app).get("/api/reveiws").expect(404);
  });
});
