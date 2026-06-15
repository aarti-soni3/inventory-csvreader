const { Products } = require("../model/Products");
const csv = require('csv-parser');
const fs = require('fs');
const { Order } = require("../model/Orders");
const { createWorkbook } = require("../Utility/exceljsUtility");

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

module.exports.exportData = async (req, res) => {

    try {
        const orders = await Order.findAll({ raw: true });

        const uniqueOrders = Object.values(await orders.reduce(async (accumlatorPromise, currentValue) => {

            const acc = await accumlatorPromise;

            if (!acc[currentValue.productId]) {
                console.log('currentValue: ', currentValue)
                const product = await Products.findByPk(currentValue.productId);
                const updatedProduct = { ...currentValue, price: product.price }
                console.log('updatedProduct: ', updatedProduct)
                acc[currentValue.productId] = updatedProduct;
            }
            else {
                acc[currentValue.productId].quantity += currentValue.quantity;
            }
            return acc;
        }, Promise.resolve({})));

        const workbook = createWorkbook('Orders');
        const worksheet = workbook.getWorksheet('Orders');

        worksheet.columns = [
            { header: 'Order ID', key: 'orderId', width: 40 },
            { header: 'Product Id', key: 'productId', width: 40 },
            { header: 'Quantity', key: 'quantity', width: 10 },
            { header: 'Price', key: 'price', width: 10 },
            { header: 'Created At', key: 'createdAt', width: 12 },
            { header: 'Updated At', key: 'updatedAt', width: 12 },
        ]

        const newRows = worksheet.addRows(uniqueOrders);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="orders.xlsx"')

        const buffer = await workbook.xlsx.writeBuffer();
        return res.status(200).send(buffer);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}