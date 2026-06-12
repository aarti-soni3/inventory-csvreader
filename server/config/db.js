const { Sequelize } = require('sequelize');

const databaseName = process.env.DATABASE_NAME || 'inventory';
const username = process.env.USERNAME || 'aarti';
const password = process.env.PASSWORD || 'aarti@123'

// console.log(username,process.env.USERNAME)
const sequelize = new Sequelize(databaseName, 'aarti', password, {
    host: 'localhost',
    dialect: 'mysql'
})

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connected successfully!`)
    } catch (error) {
        console.log(`unable to connect database : ${error.message}`)
    }
}

module.exports = { sequelize, connectToDatabase }