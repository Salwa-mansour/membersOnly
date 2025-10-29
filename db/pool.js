const dotenv =require('dotenv');
const {Pool} =require("pg");

dotenv.config({ path: 'config.env' });

module.exports = new Pool({
  connectionString:process.env.dbConnection
});