module.exports.productDataBykey = (products) => {
    return products.reduce((acc, currValue) => {
        if (!acc[currValue.productId])
            acc[currValue.productId] = currValue
        return acc;
    }, {})
}

module.exports.uniqueOrderReducer = (orders, productData) => {
    return Object.values(orders.reduce((accumlator, currentValue) => {

        let price = 0, taxPercentage = 0;
        const { productId, quantity } = currentValue;
        if (!accumlator[productId]) {

            if (productId === productData[productId].productId) {
                price = productData[productId].price;
                taxPercentage = productData[productId].taxPercentage
            }

            const updatedProduct = { ...currentValue, price: price, taxPercentage: taxPercentage }
            accumlator[productId] = updatedProduct;
        }
        else {
            accumlator[productId].quantity += quantity;
        }
        return accumlator;
    }, {}));
} 