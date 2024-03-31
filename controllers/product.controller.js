const Product = require('../models/product.model.js')

exports.findAll = async(req, res) => {
    console.log("Find all the products")
    try {
        const result = await Product.find()
        res.status(200).json({data : result})
    }catch(err) {
        console.log('Problem in reading products, ', err)
    }
}

exports.findOne = async(req,res) => {
    const productId = req.params.id
    console.log('Find product with id', productId)
    try {
        const result = await Product.findOne({_id : productId})
        res.status(200).json(result)
    } catch (err) {
        console.log('Problem in reading product with id', productId)
    }
}

exports.create = async(req, res) => {
    const newProduct = new Product ({
        product : req.body.product,
        description : req.body.description,
        cost : req.body.cost,
        quantity : req.body.quantity
    })

    try {
        const result = await newProduct.save()
        res.status(201).json(result)
        console.log('Success in inserting product:', newProduct.product)
    } catch (err) {
        res.status(400).json({ data : err })
        console.log('Problem in inserting product', newProduct.product, err )
    }
}

exports.update = async(req, res) => {
    const productId = req.params.id
    console.log('Updating product with id', productId)

    const updateProduct = {
        product : req.body.product,
        description : req.body.description,
        cost : req.body.cost,
        quantity : req.body.quantity
    }
    try {
        const result = await Product.findOneAndUpdate(
            {_id : productId }, updateProduct, {new: true}
        )
        res.status(200).json(result)
        console.log('Success in updating product with id', productId)
    } catch (err) {
        res.status(400).json({error : err.message})
        console.log('Problem in updating product with id', productId, err)
    }
}

exports.delete = async(req, res) => {
    const productId = req.params.id
    console.log('Delete product with id', productId)

    try {
        const result = await Product.deleteOne({_id: productId})
        res.status(200).json(result)
        console.log('Success in deleting product with id', productId)
    } catch (err) {
        res.status(400).json({error : err.message})
        console.log('Problem in deleting product with id', productId, err)
    }
}

exports.updateOneField = async(req, res) => {
    const product = req.params.product
    const field = req.params.updatefield
    const value = req.params.value
    console.log('Update product', product, 'in', field)

    try {
        const result = await Product.findOneAndUpdate(
            {product : product}, { $set: { [field]: value } }
        )
        res.status(200).json(result)
        //res.status(200).json({"Updating in product" : product, [field] : value})
        console.log('Success in updateting product', product)
    } catch(err) {
        res.status(400).json({error : err.message})
        console.log('Problem in updating product', product, err)
    }
}

