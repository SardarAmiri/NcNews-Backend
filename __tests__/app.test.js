const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')

beforeEach(() => { 
    return seed(testData)
})

afterAll(() => {
    return db.end();
})

describe('Integreation App Testing For EndPoints', () => {
    describe('CORE: GET /api/topics', () => {
        test('status 200', () => {
            return request(app).get('/api/topics').expect(200)
        }) 
        test('status 200: respond with an array of topics objects', () => {
            return request(app).get('/api/topics')
            .then((response) => {
                const {body} = response
                expect(body.topics).toBeInstanceOf(Array);
                expect(body.topics).toHaveLength(3);
                body.topics.forEach(topic => {
                    expect(topic).toHaveProperty('slug', expect.any(String))
                    expect(topic).toHaveProperty('description', expect.any(String))
                });
            })
            
        })   
    })
    describe('For All non-exsitance path', () => {
        test('404: responds with 404 when path is not exist', () => {
            return request(app)
            .get('/api/topecs')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('endpoint not found')
            })
        })
    })
    describe('CORE: GET /api', () => {
        test('status 200', () => {
            return request(app)
            .get('/api')
            .expect(200)
        })
        test('provide a description of all endpoints available', () => {
            return request(app).get('/api')
            .expect(200)
            .then(({body}) => {
            expect(body.description).toBeInstanceOf(Array)
            expect(body.description).toEqual([ 'GET /api', 'GET /api/topics', 'GET /api/articles' ])
            })
        })
    })
    describe('CORE: GET /api/articles/:article_id', () => {
        test('status 200: on /api/articles/:article_id', () => {
            return request(app)
            .get('/api')
            .expect(200)
        })
        test('status 200: with an article object with all properties', () => {
            return request(app).get('/api/articles/3')
            .then(({body}) => {
                expect(body).toBeInstanceOf(Object)
                expect(Object.keys(body.articles)).toHaveLength(8)
                expect(body.articles).toMatchObject({
                        article_id: 3,
                        title: 'Eight pug gifs that remind me of mitch',
                        topic: 'mitch',
                        author: 'icellusedkars',
                        body: 'some gifs',
                        created_at: '2020-11-03T09:12:00.000Z',
                        votes: 0,
                        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
                })
            })
        })
        test('status 404: with a response msg No user found for user_id: id', () => {
            return request(app).get('/api/articles/1000')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('No user found for user_id: 1000')
            })
        })
        test('status 400: with a response msg Bad request', () => {
            return request(app).get('/api/articles/banana')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request')
            })
        })
    })
})