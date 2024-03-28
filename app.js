const express = require ('express')
const app = express()
// const port = 3000

const mongoose = require('mongoose')

require('dotenv').config()

app.use(express.json())

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.js')


mongoose.connect(process.env.MONGODB_URI).then(
    () => { console.log("Connection to mongoDB established")},
    err => {console.log("Failed to connect to mongoDB", err)}
)

const cors = require('cors')                    //cross origin
app.use(cors({
    origin : '*'                    // ο web server δινει προσαβση σε ολους
    //origin : ['http://localhost:8000/', 'http://www.aueb.gr']
}))

const user = require('./routes/user.route.js')
const userProduct = require('./routes/user.products.route.js')

app.use('/', express.static('files'))

app.use('/api/users', user )    

app.use('/api/user-products', userProduct)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.options))

// app.listen(port, () => {                
//     console.log("Server is up !")
// })

module.exports = app


//τη βιβλιοθηκη dotenv τη χρεισιμοποιώ για να μπορει να διαβασει το jest το αρχειο env
//τη βιβλιοθηκη supertest τη χρησιμοπποιω για να μπορεσει το jest να κανει κλησεις get, post κτλ