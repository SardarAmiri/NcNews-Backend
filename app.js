const express = require('express')
const CustomError = require('./utils/customError')
const errorHandlerMiddleware = require('./nc-news-controller/errorController')
const { getTopics, getApi, getArticleById, getArticles} = require('./nc-news-controller/nc-news.controller')


const app = express()
app.use(express.json())


app.get('/api/topics', getTopics)
app.get('/api', getApi)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getArticles)


app.all('*', (req, res, next) => {
    const err = new CustomError('endpoint not found', 404)
    next(err)
})

app.use(errorHandlerMiddleware);


module.exports = app 