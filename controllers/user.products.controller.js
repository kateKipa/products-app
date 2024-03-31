const User = require('../models/user.model.js')

exports.findAll = async(req, res) => {
    console.log("Find all user's products")

    try {
        const result = await User.find({}, {username:1, products: 1, _id: 0})
        res.status(200).json({data : result})
        console.log("Reading all user's products")
    } catch(err) {
        res.status(400).json({data : err})
        console.log("Problem in reading user's products")
    }
}

exports.findOne = async(req, res) => {
    
    const username = req.params.username
    console.log('Find products for user: ', username)

    try {
        const result = await User.findOne({username : username}, {_id : 0, username : 1, products : 1})
        res.status(200).json({ data : result})
        console.log ('Success in finding products of user : ', username)
    } catch (err) {
        res.status(400).json({data : err})
        console.log('Problem in finding products of user: ', username)
    }
}

exports.create = async(req, res) => {

    const username = req.body.username
    const products = req.body.products

    console.log('Inserting products for user : ', username)

    try {
        const result = await User.updateOne(
            {username : username}, 
            {
                $push : {
                    products: products
                }
            }
        )
        res.status(200).json({data : result})
        console.log('Success in updating products of user: ', username)
    } catch (err) {
        res.status(400).json({ data: err})
        console.log('Failure in inserting the product')
    }
}

exports.update = async(req, res) => {
    const username = req.params.username
    const _id = req.body.products._id
    const quantity = req.body.products.quantity

    console.log('Update product for username ', username)
    
    try {
        const result = await User.updateOne(
            { username : username, 'products._id' : _id },
            {
                $set : {
                    'products.$.quantity' : quantity
                }
            }
        )
        res.status(200).json({ data : result})
        console.log('Success in updating product')
    } catch (err) {
        res.status(400).json({ data : err})
        console.log("Problem in updating product", username)
    }
}

exports.delete = async(req, res) => {
    const username = req.params.username
    const _id = req.params.id
    console.log('Delete product')

    try {
        const result = await User.updateOne(
            {username : username, },
            {
                $pull : {
                    products : {_id : _id}
                    }
                }
        )
        res.status(200).json({ data : result})
        console.log('Success in deleting product')
    } catch (err) {
        res.status(400).json({ data : err})
        console.log("Problem in deleting product", username)
    }
}