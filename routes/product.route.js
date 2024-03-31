const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller.js')

router.get('/', productController.findAll)

router.get('/:id', productController.findOne)

router.post('/', productController.create)

router.patch('/:id', productController.update)

router.delete('/:id', productController.delete)

router.patch('/:id/:updatefield/:value', productController.updateOneField)

module.exports = router