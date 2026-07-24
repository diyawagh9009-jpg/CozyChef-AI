🍓 CozyChef AI

An AI-powered recipe generator that transforms everyday ingredients into delicious, personalized recipes using Generative AI. CozyChef AI combines a warm, game-inspired interface with a powerful Large Language Model to make cooking fun, simple, and interactive.

---

✨ Features


- 🍽️ Generate recipes from available ingredients
- 🤖 AI-powered recipe generation using Groq API (Llama 3.3 70B Versatile)
- 🥗 Supports dietary preferences and serving sizes
- 📖 Complete recipes with:
  - Recipe Name
  - Description
  - Cooking Time
  - Difficulty
  - Calories
  - Ingredients
  - Step-by-step Instructions
  - Chef Tips
  - Healthy Alternatives
  - Fun Facts
  - Presentation Tips
- 🎨 Cute pastel UI inspired by cozy cooking games
- 📱 Fully responsive design
- 🐳 Dockerized for easy deployment
- ☁️ Cloud deployed with Render

---

🛠️ Tech Stack

Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

Backend
- Node.js
- Express.js

AI Model
- Groq API
- Llama 3.3 70B Versatile

DevOps
- Docker
- GitHub
- Render

---

📂 Project Structure

```
CozyChef-AI/
│
├── client/        # React Frontend
├── server/        # Express Backend
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

⚙️ Installation

Clone the repository

```bash
git clone https://github.com/diyawagh9009-jpg/CozyChef-AI.git
```

Go to the project

```bash
cd CozyChef-AI
```

Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

---

🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```
OPENAI_API_KEY=YOUR_GROQ_API_KEY
PORT=4000
```

---

▶️ Run Locally

Start the backend

```bash
cd server
npm start
```

Start the frontend

```bash
cd client
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:4000
```

---

🐳 Docker

Build the Docker image

```bash
docker build -t cozychef-ai .
```

Run the container

```bash
docker run -p 4000:4000 --env-file server/.env cozychef-ai
```

---

🚀 Live Demo

**Live Application**

https://cozychef-ai.onrender.com

---

💻 GitHub Repository

https://github.com/diyawagh9009-jpg/CozyChef-AI

---

👨‍💻 Team

---

📌 Future Enhancements

- Voice-based ingredient input
- Image recognition of ingredients
- Nutrition analysis
- Weekly meal planner
- Grocery list generation
- User authentication
- Recipe history
- Multi-language support

---

📄 License

This project was developed for academic purposes as part of the Vibe Coding Masterclass Project.
