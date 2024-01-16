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