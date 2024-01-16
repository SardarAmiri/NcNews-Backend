const db = require('../db/connection')
module.exports.fetchAllTopics = () => {
    // console.log('I am in model')
    return db.query("SELECT * FROM topics")
    .then((topicsData) => {
        return topicsData.rows
    })
    
}