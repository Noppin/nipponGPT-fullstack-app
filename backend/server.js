require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = process.env.PORT_NUMBER || 4000;
const apiKey = process.env.OPENAI_API_KEY;

//Middleware

app.use(express.json());
app.use(cors());

//CRUD
app.post("/completions", async (req, res) => {
  const { content, context, currentTitle } = req.body;

  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };
  const params = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant",
      },
      { role: "user", content: content },
    ],
    max_tokens: 100,
  };

  if (context) {
    const filteredContext = context.filter(
      (item) => item.title === currentTitle
    );
    for (let i = 1; i < filteredContext.length; i += 2) {
      params.messages.unshift({
        role: "assistant",
        content: filteredContext[i].context,
      });
      params.messages.unshift({
        role: "user",
        content: filteredContext[i - 1].context,
      });
    }
  }
  try {
    const { data } = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      params,
      options
    );
    res.json({ data, msg: "Successful" });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, console.log(`Server running on port ${port}`));
