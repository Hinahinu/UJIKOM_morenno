import { Sequelize } from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Product = db.define('produk', {
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
    name : DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    kategori: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    harga: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stok: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    keuntungan: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

export default Product;

(async () => {
    await db.sync();
})();