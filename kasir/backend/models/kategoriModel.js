import { Sequelize } from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Kategori = db.define('kategori', {
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
    }
    ,
    kategori: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

export default Kategori;

(async () => {
    await db.sync();
})();