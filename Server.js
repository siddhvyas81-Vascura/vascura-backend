const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route (browser test ke liye)
app.get("/", (req, res) => {
  res.send("VASCURA Backend Running Successfully 🚀");
});

// Diagnosis route (MOCK AI - No OpenAI)
app.post("/diagnosis", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // Fake AI response
    const fakeResponse = `
Based on your symptoms: "${prompt}"

• Stay hydrated
• Take proper rest
• Monitor your temperature
• Take paracetamol if fever is high
• If symptoms last more than 2 days, consult a doctor

(This is a demo AI response - OpenAI temporarily disabled)
`;

    res.status(200).json({
      success: true,
      diagnosis: fakeResponse,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});