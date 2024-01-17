const { response } = require('../app')
const db = require('../db/connection')
const fs = require('fs/promises')
const CustomError = require('../utils/customError')
module.exports.fetchAllTopics = () => {
    // console.log('I am in model')
    return db.query("SELECT * FROM topics")
    .then((topicsData) => {
        return topicsData.rows
    })
}

module.exports.fetchAllApi = () => {
    return fs.readFile('./endpoints.json')
    .then((result) => {
        const json = JSON.parse(result)
        const availableEndPoints = Object.keys(json)
        return availableEndPoints
    })
}

module.exports.fetchArticleById = (id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1;", [id])
    .then((respons) => {
        if(respons.rows.length === 0){
            const err = new CustomError(`No user found for user_id: ${id}`, 404)
            return Promise.reject(err)
        }
        return respons.rows[0]
    })
}

module.exports.fetchArticles = () => {
        return db.query("SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url, CAST(COUNT (c.comment_id) AS INTEGER) AS comment_count FROM articles AS a LEFT JOIN comments AS c ON a.article_id = c.article_id GROUP BY a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url ORDER BY a.created_at DESC;")
        .then((result) => {
            return result.rows
        })
}

module.exports.fetchComments = (article_id) => {
    return db.query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC", [article_id])
    .then((result) => {
        if(result.rows.length === 0){
            const err = new CustomError(`No user found for user_id: ${article_id}`, 404)
            return Promise.reject(err)
        }
        return result.rows
    })
}