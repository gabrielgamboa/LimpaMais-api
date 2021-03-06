require('dotenv').config();

// require('dotenv').config({
//     path: process.env.NODE_ENV.trim() === "dev" ? ".env.dev" : ".env"
// })

// const dialectOptions = {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
// }

module.exports = {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: null,
    // dialectOptions: process.env.NODE_ENV.trim() === "dev" ? null : dialectOptions,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    },
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    operatorAliases: false,
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    },
}