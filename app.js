// express server
const express = require("express")
const app = express();
const path = require("path");
const dotenv =require('dotenv');
// --------------
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const flash = require('connect-flash');
const pool = require('./db/pool'); // Your PostgreSQL connection pool
// --------------
dotenv.config({ path: 'config.env' });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
//------------------

// Session middleware configuration
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'session', // Name of the table storing session data
  }),
  secret: process.env.SESSION_SECRET, // Use a secret from an environment variable
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));
// Configure flash middleware
app.use(flash());
// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Load Passport configuration
require('./middleware/passportConfig')(passport);

//routes
 app.use('/',require(path.join(__dirname,'routs','accountRouter')));
// app.use('/authors',require(path.join(__dirname,'routers','authorRouter')));
// app.use('/books',require(path.join(__dirname,'routers','bookRouter')));
//------------------
app.use('/{*splat}', async (req, res) => {
   // *splat matches any path without the root path. If you need to match the root path as well /, you can use /{*splat}, wrapping the wildcard in braces.
   //res.sendFile(path.join(__dirname,'views','404.html'))
     res.render("404", { message: `error`});
 });

const PORT = process.env.urlPORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});