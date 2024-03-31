const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../app')
const helper = require('../helpers/product.helper')

require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        ()=> {console.log('Connection to MongoDB established')},
        err => { console.log('Failed to connect to MongoDB', err)}
    )
})         

afterEach(async ()=> {
    await mongoose.connection.close()
}) 

describe('Request GET / api/products', () => {
    test('Return all products', async() => {
        const res = await request(app).get('/api/products')
        expect(res.statusCode).toBe(200)
        expect(res.body.data.length).toBeGreaterThan(0)
    }, 2000)
})

describe('Request POST api/products/', () => {
    it('Creates a product', async() => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product : 'milk',
            description : 'Almond Milk',
            cost : 2.5,
            quantity : 200
        })
        expect(res.statusCode).toBe(201)
        expect(res.body).toBeTruthy()
    }, 3000)
})

describe('Request GET api/products/:id', () => {
    it('Returns a product', async () => {
        const result = await helper.findLastInsertedProduct()
        console.log(result)

        const res = await request(app)
        .get('/api/products/' + result._id)
        expect(res.statusCode).toBe(200)
        expect(res.body._id.toString()).toEqual(result._id.toString())
    }, 5000)
})

describe ('DELETE /api/products/:id', () => {
    it('Delete the last inserted product', async() => {
        const result = await helper.findLastInsertedProduct()
        console.log(result)

        const res = await request(app)
        .delete('/api/products/' + result._id)
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeTruthy
    }, 2000)
})