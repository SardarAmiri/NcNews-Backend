const { fetchAllTopics, fetchAllApi} = require('../nc-news-model/nc-news.model')




module.exports.getTopics = (req, res) => {
    fetchAllTopics()
    .then((result) => {
        res.status(200).send({topics: result})
    })
}

module.exports.getApi = (req, res) => {
    fetchAllApi().then((result) => {
        res.status(200).send({description: result})
    })
}