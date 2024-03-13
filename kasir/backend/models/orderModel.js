import { Sequelize } from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Order = db.define('pesanan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'admin',
            key: 'id',
        },
    },
    id_pesanan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_produk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produk',
            key: 'id',
        },
    },
    jumlah_produk: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

export default Order;

(async () => {
    await db.sync();
})();