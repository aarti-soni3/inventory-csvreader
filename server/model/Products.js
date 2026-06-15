const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')
const { Order } = require('./Orders')

module.exports.Products = sequelize.define(
    'products',
    {
        productId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
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
        taxPercentage: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        underscored: true,
        timestamps: true,
    }
)

this.Products.hasMany(Order, {
    foreignKey: 'productId'
})

Order.belongsTo(this.Products, {
    foreignKey: 'productId'
});


const syncTable = async () => {
    await sequelize.sync({ force: true });
}

// syncTable();