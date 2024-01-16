const { fetchAllTopics, fetchAllApi} = require('../nc-news-model/nc-news.model')




module.exports.getTopics = (req, res) => {
    const url = req.url
    console.log(url)
    // console.log('I am in controller')
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