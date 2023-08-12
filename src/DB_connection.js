require("dotenv").config();
const { Sequelize } = require("sequelize");
const favoriteModel = require("./models/Favorite");
const userModel = require("./models/User");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;
// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty

// const sequelize = new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/rickandmorty`,
//     { logging: false, native: false }
// );
const sequelize = new Sequelize(DB_DEPLOY, {
    logging: false,
    native: false,
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
});

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.
favoriteModel(sequelize);
userModel(sequelize);
//

//

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Favorite } = sequelize.models;
User.belongsToMany(Favorite, { through: "user_favorite" });
Favorite.belongsToMany(User, { through: "user_favorite" });

module.exports = {
    User,
    Favorite,
    conn: sequelize,
};
