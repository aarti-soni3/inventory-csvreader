const express = require('express');
const ProductController = require('../controller/ProductController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const extName = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extName}`);
    }
})

const uploads = multer({ storage })

router.route('/getAllProducts').get(ProductController.getAllProducts);
router.route('/updateDataFromFile').post(uploads.single('file'), ProductController.updateDataFromFile);

module.exports = router