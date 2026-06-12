const express = require('express');
const ProductController = require('../controller/ProductController');
const router = express.Router();
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' })

router.route('/getAllProducts').get(ProductController.getAllProducts);

router.route('/updateDataFromFile').post(uploads.single('file'), ProductController.updateDataFromFile);

module.exports = router