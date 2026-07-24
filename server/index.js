import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

function buildPrompt({ ingredients, preferences, diet, servings }) {
  return `You are CozyChef AI 🍓.

Generate a delicious recipe using the following details.

Ingredients: ${ingredients}
Preferences: ${preferences}
Diet: ${diet}
Servings: ${servings}

Return the recipe in Markdown with:

# Recipe Name

Short Description

Cooking Time

Difficulty

Calories

Ingredients

Steps

Chef Tips

Healthy Alternative

Fun Fact

Presentation Tips

Use a cute, cozy, wholesome tone like a cooking game.
`;
}

app.post("/api/generate", async (req, res) => {
  const { ingredients = "", preferences = "", diet = "", servings = "" } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "OpenRouter API key is missing.",
    });
  }

  const prompt = buildPrompt({
    ingredients,
    preferences,
    diet,
    servings,
  });

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "CozyChef AI",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are CozyChef AI, a cute and cozy cooking assistant.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.8,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return res.status(response.status).json(data);
    }

    res.json({
      text: data.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});