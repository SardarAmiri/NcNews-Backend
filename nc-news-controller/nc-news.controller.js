const { fetchAllTopics } = require('../nc-news-model/nc-news.model')




module.exports.getTopics = (req, res) => {
    // console.log('I am in controller')
    fetchAllTopics()
    .then((result) => {
        res.status(200).send({topics: result})
    })
    
   
}