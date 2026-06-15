const { Products } = require("../model/Products");
const csv = require('csv-parser');
const fs = require('fs');
const { Order } = require("../model/Orders");
const { createWorkbook, orderTableColumns, setOrderTotalFormula } = require("../Utility/exceljsUtility");
const { uniqueOrderReducer, productDataBykey } = require("../Utility/productUtility");
const { start } = require("repl");
const { Op } = require("sequelize");

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

    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)

    if (!startDate || !endDate)
        return res.status(400).json({ message: 'Invalid Data!' });

    console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString())
    try {
        const orders = await Order.findAll({
            where: { createdAt: { [Op.between]: [startDate, endDate] }, },
            raw: true
        });

        if (!orders || orders.length <= 0)
            return res.status(404).json({ message: 'Orders not found!' });

        console.log('orders: ', orders)
        const idsToFind = await orders.map((order) => order.productId)
        const products = await Products.findAll({
            attributes: ['productId', 'price', 'taxPercentage'],
            where: { productId: idsToFind },
            raw: true,
        });

        // console.log('products: ', products)
        const productData = productDataBykey(products);
        // console.log('productData: ', productData)
        const uniqueOrders = uniqueOrderReducer(orders, productData);
        // console.log('unique orders :', uniqueOrders)

        const workbook = createWorkbook('Orders');
        const worksheet = workbook.getWorksheet('Orders');
        worksheet.columns = orderTableColumns;

        const newRows = worksheet.addRows(uniqueOrders);
        setOrderTotalFormula(worksheet);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="orders.xlsx"')

        const buffer = await workbook.xlsx.writeBuffer();
        return res.status(200).send(buffer);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}