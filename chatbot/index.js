const express = require('express');

const app = express();

app.use(express.json());

function getBotReply(message) {
    const msg= message.toLowerCase();
    let reply=""

    if(msg.includes("good morning"))
        reply+= "Good morning! Hope you have a fantastic day ahead!"

    if(msg.includes("good night"))
        reply+="Good night! sleep well and sweet dreams!";

    if (msg.includes('hello')  || msg.includes('hi')) 
        reply+=" hello! How can I assist you today?";
    
    if(msg.includes("how are you"))
        reply+=" I'm just a bot, but thanks for asking! How can I help you today?";

    if(msg.includes("name")) 
        reply+=" I am a Node.js chatbot, created to help you!";
    
    if(msg.includes("help"))
        reply+=" Sure! I am here to help you. What do you need assistance with?";
    
    if(msg.includes("bye") || msg.includes("goodbye"))
        reply+=" Goodbye! Have a great day!";
    
    return reply.length >0? String(reply): "I'm sorry, I didn't understand that. Can you please rephrase?";
}

app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    const reply = getBotReply(userMessage);
    res.json({ reply: reply });
});

const PORT = 5000;
app.listen(PORT, () => { console.log(`Chatbot is running on port ${PORT}`)});