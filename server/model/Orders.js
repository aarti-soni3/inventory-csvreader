// id, sell quantity, produ id , sold out date 

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports.Order = sequelize.define(
    'orders',
    {
        orderId: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        underscored: true,
        timestamps: true,

    }
);

const syncTable = async () => {
    await sequelize.sync({ force: true });
}

// syncTable();