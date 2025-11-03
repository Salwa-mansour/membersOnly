const db = require("../db/queries");


async function messageList(req,res) {

  try{
    let messages = await db.getAllMessages();
    const messagesToShow = [];
    for (const message of messages) {    
      const author = await db.findUserById(message.authorid);
      const createdAt = formatDateToDMY(message.createdAt) ;
      messagesToShow.push({
        title:message.title,
        text:message.text,
        author:`${author.firstname} ${author.lastname}`,
        date:createdAt
      })
    }

    res.render("message/index", {
        title: "messages",
        user:req.user,
        messages:messagesToShow 
    });
   } catch(error) {
        console.error("Error :", error);
        throw error;
   }

   
}
async function createMessage(req,res) {

  try{
   await db.createMessage({
    title:req.body.title,
    text :req.body.message,
    authorId:req.user.id
   });
 
   res.redirect("/");
    
  } catch(error) {
        console.error("Error :", error);
        throw error;
  }
 
}
function formatDateToDMY(date) {
    // Options for day, month, and year (numeric)
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    
    // 'en-GB' locale ensures day/month/year order in the output
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}

module.exports = {
    messageList,
    createMessage
}