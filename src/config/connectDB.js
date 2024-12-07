const { Sequelize } = require('sequelize');
require('dotenv').config();

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// Option 3: Passing parameters separately (other dialects)
const dbUrl = process.env.CLEVER_MYSQL_URL;

const sequelize = new Sequelize(
    dbUrl,
    {
        //host: process.env.DB_HOST,
        //dialect: process.env.DB_DIALECT,
        //logging: false,
        query: {
            "raw": false,
        },
        timezone: "+07:00",
    }
);

// hàm xác thực sự kết nối
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to DB has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;