const db = require('../db/connection')
const fs = require('fs/promises')
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