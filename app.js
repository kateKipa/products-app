const express = require ('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI).then(
    () => { console.log("Connection to mongoDB established")},
    err => {console.log("Failed to connect to mongoDB", err)}
)

const user = require('./routes/user.route.js')
const userProduct = require('./routes/user.products.route.js')

app.use('/api/users', user )    

app.use('/api/user-products', userProduct)

app.listen(port, () => {
    console.log("Server is up !")
})