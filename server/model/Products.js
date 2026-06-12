const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

module.exports.Products = sequelize.define(
    'products',
    {
        productId: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
    },
    {
        underscored: true,
        timestamps: true,
    }
)

const syncTable = async () => {
    await sequelize.sync({ force: true });
}

// syncTable();