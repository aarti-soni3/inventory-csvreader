const { Products } = require("../model/Products");

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
        return res.status(201).json({ message: 'Success!' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}