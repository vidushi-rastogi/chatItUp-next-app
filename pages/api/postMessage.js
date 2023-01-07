// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const message = req.body.message;
    const chatParter = req.body.chatPartner;
    const chats = await fs.readFile('./db/chats.json', 'utf-8',(error, data) => {
      if (error) {
        console.log('ERROR While retrieving chats: ', error)
      }
      else {
        
      }
    });

    res.status(200).json({ message })
  }
}
