const express = require("express");
const cors = require("cors");
const CustomError = require("./utils/customError");
const errorHandlerMiddleware = require("./nc-news-controller/errorController");
const {
  getTopics,
  getArticleById,
  getArticles,
  getComments,
  postCommentOnArticle,
  patchArticlesById,
  deleteCommentsById,
  getUsers,
} = require("./nc-news-controller/nc-news.controller");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
// app.get("/api/articles?topic=value", getArticles);
app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postCommentOnArticle);
app.patch("/api/articles/:article_id", patchArticlesById);
app.delete("/api/comments/:comment_id", deleteCommentsById);

app.get("/api/users", getUsers);

app.all("*", (req, res, next) => {
  const err = new CustomError("endpoint not found", 404);
  next(err);
});

app.use(errorHandlerMiddleware);

module.exports = app;
