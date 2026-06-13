const { Products } = require("../model/Products");
const csv = require('csv-parser');
const fs = require('fs');

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Products.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'expirationDate'] } });
        res.status(200).json({ products: products, message: 'success' });
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.updateDataFromFile = async (req, res) => {
    try {
        console.log('req file : ', req?.file)
        const { file } = req;

        const productData = await new Promise((resolve, reject) => {
            const data = [];
            fs.createReadStream(file.path)
                .pipe(csv())
                .on('data', (row) => { console.log(row); data.push(row) })
                .on('end', () => { resolve(data) })
                .on('error', (error) => { reject(error) })
        });

        if (productData && productData.length > 0) {
            const processedData = await Products.bulkCreate(productData, {
                conflictAttributes: ['productId'],
                updateOnDuplicate: ['productName', 'quantity', 'price', 'manufacture', 'category', 'expirationDate', 'location', 'barcode', 'weight', 'updatedAt']
            })
            return res.status(200).json({ message: 'Product Data Updated!' })
        }
        return res.status(400).json({ message: 'invalid data' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}