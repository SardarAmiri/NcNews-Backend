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
    describe('CORE: GET /api/articles', () => {
        test('status 200 on /api/articles', () => {
            return request(app).get('/api/articles').expect(200)
        })
        test('status 200: respond with an articles array of article objects with all properties', () => {
            return request(app).get('/api/articles')
            .then(({body}) => {
                expect(body.article).toBeInstanceOf(Array);
                expect(body.article).toHaveLength(13);
                body.article.forEach(art => {
                    expect(typeof art.author).toBe('string')
                    expect(typeof art.title).toBe('string')
                    expect(typeof art.article_id).toBe('number')
                    expect(typeof art.topic).toBe('string')
                    expect(typeof art.created_at).toBe('string')
                    expect(typeof art.votes).toBe('number')
                    expect(typeof art.article_img_url).toBe('string')
                    expect(typeof art.comment_count).toBe('number')
                    

                });
               
            })
        })
        test('by default the articles should be sorted by date in descending order.', () => {
            return request(app).get('/api/articles')
            .then(({body}) => {
                expect(body.article).toBeSortedBy('created_at', { descending: true });
            })
        })
        test('404 status: respond with msg not found', () => {
            return request(app).get('/api/articls')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).toBe('endpoint not found')
            })
        })
    })
    describe('CORE: GET /api/articles/:article_id/comments', () => {
        test('status 200 available on /api/articles/:article_id/comments', () => {
            return request(app)
            .get('/api/articles/5/comments')
            .expect(200)
        })
        test('status 200: get an array of comments for the given article_id of which each comment should have the following properties', () => {
            return request(app)
            .get('/api/articles/5/comments')
            .then(({body}) => {
                expect(body.comments).toBeInstanceOf(Array);
                body.comments.forEach(comment => {
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.votes).toBe('number')
                    expect(typeof comment.created_at).toBe('string')
                    expect(typeof comment.author).toBe('string')
                    expect(typeof comment.body).toBe('string')
                    expect(typeof comment.article_id).toBe('number')
                    
                });
            })
        })
        test('By default Comments should be soredby created_at which shows with the most recent comments first.', () => {
            return request(app)
            .get('/api/articles/5/comments')
            .then(({body}) => {
                expect(body.comments).toBeSortedBy('created_at', {descending: true})
            })
        })
        test('status 400: with a response msg Bad request', () => {
            return request(app).get('/api/articles/five-hundred/comments')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe('Bad request')
            })
        })
    })
    describe('CORE: POST /api/articles/:article_id/comments', () => {
        test('status 201: Responds with the posted comment.', () => {
            const commentToSend = {
                username: 'butter_bridge',
                body: 'read my article and share it with your friends'
            }
            return request(app)
            .post('/api/articles/4/comments')
            .send(commentToSend)
            .then((response) => {
                expect(response.body.comment).toMatchObject({
                    comment_id: 19,
                    body: 'read my article and share it with your friends',
                    author: 'butter_bridge'
                })
            })
        })
        test('status 400: respons with a Bad request when posting missing properties', () => {
            const commentToSend = {
                username: 'butter_bridge',
            }
            return request(app)
            .post('/api/articles/4/comments')
            .send(commentToSend)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad request missing some properties')
            })
        })
        test('status 404: Responds with No user found when posting with id which not exist.', () => {
            const commentToSend = {
                username: 'butter_bridge',
                body: 'read my article and share it with your friends'
            }
            return request(app)
            .post('/api/articles/400/comments')
            .send(commentToSend)
            .expect(404)
            .send(commentToSend)
            .then((response) => {
                expect(response.body.msg).toBe('No user found for article_id')
            })
            
        })
    })
})