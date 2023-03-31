const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const sorted = require("jest-sorted");
const endpoints = require("../endpoints.json");

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
  describe("GET requests", () => {
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
    it("GET 200 - responds with a review object now containing a comment count", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({ body }) => {
          const { review } = body;
          expect(review).toBeInstanceOf(Object);
          expect(review.review_id).toBe(2);
          expect(review.comment_count).toBe(3);
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
  describe("PATCH requests", () => {
    it("PATCH 200 - responds with the review object updated to the accurate amount of votes increased", () => {
      const votes = { inc_votes: 1 };
      return request(app)
        .patch("/api/reviews/1")
        .send(votes)
        .expect(200)
        .then(({ body }) => {
          const { updatedReview } = body;
          expect(updatedReview).toBeInstanceOf(Object);
          expect(updatedReview.review_id).toBe(1);
          expect(updatedReview.votes).toBe(2);
          expect(updatedReview).toHaveProperty("title", expect.any(String));
          expect(updatedReview).toHaveProperty("designer", expect.any(String));
          expect(updatedReview).toHaveProperty("owner", expect.any(String));
          expect(updatedReview).toHaveProperty(
            "review_img_url",
            expect.any(String)
          );
          expect(updatedReview).toHaveProperty(
            "review_body",
            expect.any(String)
          );
          expect(updatedReview).toHaveProperty("category", expect.any(String));
          expect(updatedReview).toHaveProperty(
            "created_at",
            expect.any(String)
          );
        });
    });
    it("PATCH 200 - responds with the review object updated to the accurate amount of votes decreased", () => {
      const votes = { inc_votes: -1 };
      return request(app)
        .patch("/api/reviews/1")
        .send(votes)
        .expect(200)
        .then(({ body }) => {
          const { updatedReview } = body;
          expect(updatedReview).toBeInstanceOf(Object);
          expect(updatedReview.review_id).toBe(1);
          expect(updatedReview.votes).toBe(0);
          expect(updatedReview).toHaveProperty("title", expect.any(String));
          expect(updatedReview).toHaveProperty("designer", expect.any(String));
          expect(updatedReview).toHaveProperty("owner", expect.any(String));
          expect(updatedReview).toHaveProperty(
            "review_img_url",
            expect.any(String)
          );
          expect(updatedReview).toHaveProperty(
            "review_body",
            expect.any(String)
          );
          expect(updatedReview).toHaveProperty("category", expect.any(String));
          expect(updatedReview).toHaveProperty(
            "created_at",
            expect.any(String)
          );
        });
    });
    it("ERROR 404 - responds with an error if given an ID that does not exist", () => {
      const votes = { inc_votes: -1 };
      return request(app)
        .patch("/api/reviews/9999")
        .send(votes)
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Review Not Found" });
        });
    });
    it("ERROR 400 - responds with an error if given an ID that is not a number", () => {
      const votes = { inc_votes: -1 };
      return request(app)
        .patch("/api/reviews/notAnId")
        .send(votes)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Invalid ID" });
        });
    });
    it("ERROR 400 - responds with an error if the vote doesn't have the key of inc_votes", () => {
      const votes = { not_votes: 1 };
      return request(app)
        .patch("/api/reviews/1")
        .send(votes)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Must have a key of inc_votes" });
        });
    });
    it("ERROR 400 - responds with an error if the vote doesn't have a number value", () => {
      const votes = { inc_votes: "not_a_vote" };
      return request(app)
        .patch("/api/reviews/1")
        .send(votes)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Must have a number value" });
        });
    });
    it("ERROR 400 - responds with an error if the vote doesn't have a number value", () => {
      const votes = { inc_votes: 1, notNeeded: 10 };
      return request(app)
        .patch("/api/reviews/1")
        .send(votes)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            msg: "Must ONLY include an inc_votes key with a num value",
          });
        });
    });
  });
});

describe("/api/reviews/review_id/comments", () => {
  describe("GET", () => {
    it("GET 200 - responds with an array of comments for the given review_id with the appropriate properties", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(3);
          comments.forEach((comment) => {
            expect(comment).toHaveProperty("comment_id", expect.any(Number));
            expect(comment).toHaveProperty("body", expect.any(String));
            expect(comment).toHaveProperty("votes", expect.any(Number));
            expect(comment).toHaveProperty("author", expect.any(String));
            expect(comment).toHaveProperty("created_at", expect.any(String));
            expect(comment).toHaveProperty("review_id", expect.any(Number));
            expect(comment.review_id).toBe(2);
          });
          expect(comments).toBeSortedBy("created_at", { descending: true });
        });
    });
    it("GET 200 - responds with an empty array if the given ID exists but has no comments", () => {
      return request(app)
        .get("/api/reviews/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toEqual([]);
        });
    });
    it("ERROR 404 - responds with an error if given an ID that does not exist", () => {
      return request(app)
        .get("/api/reviews/9999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Review Not Found" });
        });
    });
    it("ERROR 400 - responds with an error if given an ID that is not a number", () => {
      return request(app)
        .get("/api/reviews/notAnId/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Invalid ID" });
        });
    });
  });
  describe("POST", () => {
    it("POST 201 - posts a new comment when given a valid object with username and body properties", () => {
      const comment = {
        username: "mallionaire",
        body: "This is my new comment!",
      };
      return request(app)
        .post("/api/reviews/1/comments")
        .send(comment)
        .expect(201)
        .then(({ body }) => {
          const { postedComment } = body;
          expect(postedComment).toHaveProperty(
            "comment_id",
            expect.any(Number)
          );
          expect(postedComment).toHaveProperty("body", expect.any(String));
          expect(postedComment.review_id).toBe(1);
          expect(postedComment).toHaveProperty("author", expect.any(String));
          expect(postedComment).toHaveProperty("votes", expect.any(Number));
          expect(postedComment).toHaveProperty(
            "created_at",
            expect.any(String)
          );
        });
    });
    it("ERROR 400 - responds with an error if given an ID that is not a number", () => {
      const comment = {
        username: "mallionaire",
        body: "This is my new comment!",
      };
      return request(app)
        .post("/api/reviews/notAnId/comments")
        .send(comment)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Invalid ID" });
        });
    });
    it("ERROR 404 - responds with an error if given an ID that does not exist", () => {
      const comment = {
        username: "mallionaire",
        body: "This is my new comment!",
      };
      return request(app)
        .post("/api/reviews/9999/comments")
        .send(comment)
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Invalid ID" });
        });
    });
    it("ERROR 400 - responds with an error if the comment doesn't have the keys of username and body", () => {
      const comment = {
        noName: "mallionaire",
        unbody: "This is my new comment!",
      };
      return request(app)
        .post("/api/reviews/1/comments")
        .send(comment)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Must include a username and body" });
        });
    });
    it("ERROR 400 - responds with an error if the comment doesn't have values which are strings", () => {
      const comment = {
        username: 1290,
        body: 999,
      };
      return request(app)
        .post("/api/reviews/1/comments")
        .send(comment)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            msg: "The username and body must be a string",
          });
        });
    });
    it("ERROR 400 - responds with an error if the comment has more than just username & body keys", () => {
      const comment = {
        username: "mallionaire",
        body: "This is my new comment!",
        notNeeded: "Why is this here?",
      };
      return request(app)
        .post("/api/reviews/1/comments")
        .send(comment)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            msg: "Must ONLY include a username and body",
          });
        });
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

describe("/api/users", () => {
  describe("GET /api/users", () => {
    it("GET 200 - responds with an array of objects with all of the users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(users).toBeInstanceOf(Array);
          expect(users).toHaveLength(4);
          users.forEach((user) => {
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("name", expect.any(String));
            expect(user).toHaveProperty("avatar_url", expect.any(String));
          });
        });
    });
    it("404 - responds with a not found error if there is a typo in the path", () => {
      return request(app).get("/api/cetagories").expect(404);
    });
  });
});

describe("/api/comments", () => {
  describe("DELETE /api/comments/:comment_id", () => {
    it("DELETE 204 - responds with no content and deletes the given comment", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(({ body }) => {
          expect(body).toEqual({});
        })
        .then(() => {
          return db.query(`SELECT * FROM comments WHERE comment_id = 1`);
        })
        .then(({ rows }) => {
          expect(rows).toEqual([]);
        });
    });
  });
  it("ERROR 400 - responds with an error if given an ID that is not a number", () => {
    return request(app)
      .delete("/api/comments/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Invalid ID" });
      });
  });
  it("ERROR 404 - responds with an error if given an ID that does not exist", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Comment Not Found" });
      });
  });
});

describe("/api", () => {
  it("GET 200 - responds with a json describing all the available endpoints in the api", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body).toEqual(endpoints);
      });
  });
});
