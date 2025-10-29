const pool = require('./pool');
const bcrypt = require('bcryptjs');

async function signupUserAccount (newUser){
  try {
  
    await pool.query("INSERT INTO users (firstName, lastName,email,password) VALUES ($1,$2,$3,$4)", [
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      newUser.password
    ]);
  
  } catch(error) {
        console.error("Error :", error);
        throw error;
  }
}
 async function findByEmail(email){
   try {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
     } catch(error) {
        console.error("Error :", error);
        throw error;
  }
  }

  // Find a user by their ID
  async function findById(id){
    try{
      const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return res.rows[0];
     } catch(error) {
        console.error("Error :", error);
        throw error;
    }
  }
  // Compare a plain text password with a hashed password
  async function comparePassword(candidatePassword, passwordHash) {
    try{
       return await bcrypt.compare(candidatePassword, passwordHash);
       } catch(error) {
        console.error("Error :", error);
        throw error;
    }
  }
module.exports = {
    signupUserAccount,
    findByEmail,
    findById,
    comparePassword
}