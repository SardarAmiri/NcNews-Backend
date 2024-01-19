const CustomError = require('../utils/customError')
const { fetchAllTopics, fetchAllApi, fetchArticleById, fetchArticles, 
    fetchComments, createCommentOnArticle, updateArticleVoteById, removedCommentsById
, fetchUsers} = require('../nc-news-model/nc-news.model')




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
        next(err)   
    })
}

module.exports.getArticles = (req, res) => {
    const {topic} = req.query
        fetchArticles(topic)
        .then((result) => {
            res.status(200).send({articles: result})
        })
}

module.exports.getComments = (req, res, next) => {
    const {article_id} = req.params
    fetchComments(article_id)
    .then((result) => {
        res.status(200).send({comments: result})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports.postCommentOnArticle = (req, res, next) => {
    const {article_id} = req.params
    createCommentOnArticle(article_id, req.body)
    .then((result) => {
        res.status(201).send({comment: result})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports.patchArticlesById = (req, res, next) => {
    const {article_id} = req.params
    const {inc_votes} = req.body
    updateArticleVoteById(article_id, inc_votes)
    .then((result) => {
        res.status(200).send({article: result})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports.deleteCommentsById = (req, res, next) =>{
    const {comment_id} = req.params
    removedCommentsById(comment_id)
    .then((result) => {
        res.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
}

module.exports.getUsers = (req, res) => {
    fetchUsers().then((result) => {
        res.status(200).send({users: result})
    })
}

