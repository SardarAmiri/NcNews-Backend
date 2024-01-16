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
            const endpoints = body.description
            expect(body.description).toBeInstanceOf(Array)
            expect(body.description).toEqual(endpoints)
            })
            
        })
       
    })
})