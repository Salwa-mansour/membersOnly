const dotenv =require('dotenv');
const { Client } = require("pg");

dotenv.config({ path: 'config.env' });
// add item count and birthdate
const SQL = `
CREATE TABLE IF NOT EXISTS  users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
firstName  VARCHAR (255),
lastName  VARCHAR (255),
email  VARCHAR (255),
password  VARCHAR (255),
isMember BOOLEAN DEFAULT FALSE ,
isAdmin BOOLEAN DEFAULT FALSE

 );
 
`;
async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString:process.env.dbConnection
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
    
}

main();