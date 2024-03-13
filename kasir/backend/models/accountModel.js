import { Sequelize } from 'sequelize';
import db from "../config/database.js"

const {DataTypes} = Sequelize;

const Account = db.define('admin',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nama_toko: {
        type: DataTypes.STRING,
        allowNull: false,
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
},{
    freezeTableName:true
});

export default Account;

(async()=>{
    await db.sync();
})();