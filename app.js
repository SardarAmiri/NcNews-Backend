const express = require('express')
const CustomError = require('./utils/customError')
const errorHandlerMiddleware = require('./nc-news-controller/errorController')
const { getTopics } = require('./nc-news-controller/nc-news.controller')


const app = express()
app.use(express.json())


app.get('/api/topics', getTopics)



app.all('*', (req, res, next) => {
    // const err = new Error('endpoint not found')
    // err.statusCode = 404
    // next(err)
    const err = new CustomError('endpoint not found', 404)
    next(err)
})

app.use(errorHandlerMiddleware);


module.exports = app 