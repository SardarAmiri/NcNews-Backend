const CustomError = require('../utils/customError')
const { fetchAllTopics, fetchAllApi, fetchArticleById, fetchArticles} = require('../nc-news-model/nc-news.model')




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

module.exports.getArticleById = (req, res, next) => {
    const article_id= req.params.article_id * 1
    fetchArticleById(article_id)
    .then((result) => {
        res.status(200).send({articles: result})
    })
    .catch((err) => {
        if(err.code === '22P02'){
            const err = new CustomError('Bad request', 400)
            next(err)
        }else{
            next(err)
        }    
    })
}

module.exports.getArticles = (req, res) => {
    fetchArticles()
    .then((result) => {
        console.log(result)
        res.status(200).send({article: result})
    })
}