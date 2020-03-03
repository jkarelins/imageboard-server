const Sequelize = require("sequelize");

const databaseURL =
  process.env.DATABASE_URL ||
  "postgres://postgres:311286@localhost:5432/postgres";

const db = new Sequelize(databaseURL);

db.sync({ force: true })
  .then(() => console.log(`DB synced.`))
  .catch(err => console.log(err));

module.exports = db;
