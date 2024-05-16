const { response } = require("../app");
const db = require("../db/connection");
const fs = require("fs/promises");
const CustomError = require("../utils/customError");
module.exports.fetchAllTopics = () => {
  // console.log('I am in model')
  return db.query("SELECT * FROM topics").then((topicsData) => {
    return topicsData.rows;
  });
};

module.exports.fetchAllApi = () => {
  //   return fs
  //     .readFile("./endpoints.json", "utf-8", (err, data))
  //     .then((result) => {
  //       const json = JSON.parse(result);
  //       console.log(json);
  //       return json;
  //     });
  return fs.readFile("./endpoints.json", "utf8", (err, data) => {
    if (err) {
      callback(err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseError) {
      callback(parseError);
    }
  });
};

module.exports.fetchArticleById = (id) => {
  // return db.query("SELECT * FROM articles WHERE article_id = $1;", [id])
  const articleQuery = `SELECT * FROM articles WHERE article_id = ${id}`;
  const commentCountQuery = `SELECT COUNT(*) AS comment_count FROM comments WHERE article_id = ${id}`;
  const article = db.query(articleQuery);
  const comment = db.query(commentCountQuery);
  return Promise.all([article, comment]).then(([article, comment]) => {
    const requestedArticle = article.rows[0];
    const numberOfComments = comment.rows[0].comment_count;
    if (article.rows.length === 0) {
      const err = new CustomError(`No user found for user_id: ${id}`, 404);
      return Promise.reject(err);
    }
    return { requestedArticle, numberOfComments };
  });
};

module.exports.fetchArticles = (topic) => {
  let sql1 =
    "SELECT a.author, a.title, a.article_id, a.topic, a.body, a.created_at, a.votes, a.article_img_url, CAST(COUNT (c.comment_id) AS INTEGER) AS comment_count FROM articles AS a LEFT JOIN comments AS c ON a.article_id = c.article_id";
  let sqlQuery = " WHERE topic = $1";
  let sql2 =
    " GROUP BY a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url ORDER BY a.created_at DESC;";
  if (topic) {
    sql1 = sql1 + sqlQuery + sql2;
    return db.query(sql1, [topic]);
  }
  sql1 += sql2;
  return db.query(sql1).then((result) => {
    return result.rows;
  });
};

module.exports.fetchComments = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        const err = new CustomError(
          `No user found for user_id: ${article_id}`,
          404
        );
        return Promise.reject(err);
      }
      return result.rows;
    });
};

module.exports.createCommentOnArticle = (article_id, { username, body }) => {
  return db
    .query(
      `INSERT INTO comments 
    (body, votes, author, article_id) 
    VALUES
    ($1, $2, $3, $4) RETURNING *`,
      [body, (votes = 0), username, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

module.exports.updateArticleVoteById = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [inc_votes, article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        const err = new CustomError(
          `No article found for article_id ${article_id}`,
          404
        );
        return Promise.reject(err);
      }
      return result.rows[0];
    });
};

module.exports.removedCommentsById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then((result) => {
      if (result.rows.length === 0) {
        const err = new CustomError(
          `No comment found for comment_id ${comment_id}`,
          404
        );
        return Promise.reject(err);
      }
      return result;
    });
};

module.exports.fetchUsers = () => {
  return db.query(`SELECT  * FROM users`).then((result) => {
    return result.rows;
  });
};
