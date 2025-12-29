require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log("Received message: ", userMessage)
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: userMessage}]
        });
        res.json({ reply: response.choices[0].message.content})
    }
    catch (error) {
        res.status(500).json({error: "Something went wrong: "+ error.message})
    }
})

app.listen(5000, () => {
    console.log("AI chatbot running on http://localhost:5000")
}) 