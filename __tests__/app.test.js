const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");

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
        expect(body).toBeInstanceOf(Object);
        expect(body.review_id).toBe(2);
        expect(body).toHaveProperty("title", expect.any(String));
        expect(body).toHaveProperty("designer", expect.any(String));
        expect(body).toHaveProperty("owner", expect.any(String));
        expect(body).toHaveProperty("review_img_url", expect.any(String));
        expect(body).toHaveProperty("review_body", expect.any(String));
        expect(body).toHaveProperty("category", expect.any(String));
        expect(body).toHaveProperty("created_at", expect.any(String));
        expect(body).toHaveProperty("votes", expect.any(Number));
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

describe("/api/reviews/review_id/comments", () => {
  it("GET 200 - responds with an array of comments for the given review_id with the appropriate properties", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const {comments} = body
        console.log(comments)
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(3);
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment.review_id).toBe(2)
        });
      });
  });
  // it("GET 200 - responds with an empty array if the given ID exists but has no comments", () => {
  //   return request(app)
  //     .get("/api/reviews/1/comments")
  //     .expect(200)
  //     .then(({ body }) => {
  //       expect(body).toEqual([]);
  //     });
  // });
  it("ERROR 400 - responds with an error if given an ID that is not a number", () => {
    return request(app)
      .get("/api/reviews/notAnId/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Invalid ID" });
      });
  });
  it("ERROR 404 - responds with an error if given an ID that does not exist", () => {
    return request(app)
      .get("/api/reviews/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "ID Not Found" });
      });
  });
});
