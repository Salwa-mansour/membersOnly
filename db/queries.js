const pool = require('./pool');
const bcrypt = require('bcryptjs');

async function signupUserAccount (newUser){
  try {
  
  const result =  await pool.query("INSERT INTO users (firstName, lastName,email,password) VALUES ($1,$2,$3,$4) RETURNING *;", [
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      newUser.password
    ]);
    
    return result.rows[0]; 
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
  async function findUserById(id){
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
  async function memberSubscribe(id ) {
      try {
  
    await pool.query("UPDATE users SET isMember = true  WHERE id = $1", [id]);
  
  } catch(error) {
        console.error("Error :", error);
        throw error;
  }
  }
  async function setAdmin(id ) {
      try {
  
    await pool.query("UPDATE users SET isAdmin = true  WHERE id = $1", [id]);
  
  } catch(error) {
        console.error("Error :", error);
        throw error;
  }
  }

  // messages============
  async function createMessage (newMessage){
  try {
  
    await pool.query("INSERT INTO messages (title, text,authorId) VALUES ($1,$2,$3)", [
      newMessage.title,
      newMessage.text,
      newMessage.authorId
    ]);
  
  } catch(error) {
        console.error("Error :", error);
        throw error;
  }
}

async function  getAllMessages() {
     try {
          const {rows} = await pool.query("SELECT * FROM messages");
          return rows;

     } catch (error) {
         console.error("Error :", error);
          throw error;
  }
}

module.exports = {
    signupUserAccount,
    findByEmail,
    findUserById,
    comparePassword,
    memberSubscribe,
    setAdmin,
    createMessage,
    getAllMessages
}