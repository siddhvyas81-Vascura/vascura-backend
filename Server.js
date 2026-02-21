const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// OpenAI Config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Root
app.get("/", (req, res) => {
  res.send("VASCURA AI Backend Live 🚀");
});

// Diagnosis Route (REAL AI)
app.post("/diagnosis", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a medical AI assistant. Provide safe, helpful, structured medical advice. Do not provide prescriptions. Always suggest consulting a doctor if serious symptoms exist.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const diagnosis = aiResponse.choices[0].message.content;

    res.status(200).json({
      success: true,
      diagnosis: diagnosis,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "AI service failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
