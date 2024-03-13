import { Sequelize } from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const User = db.define('petugas', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
}, {
    freezeTableName: true
});

export default User;

(async () => {
    await db.sync();
})();