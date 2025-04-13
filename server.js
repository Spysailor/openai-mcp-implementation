// Serveur pour OpenAI MCP
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Configuration
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialisation d'OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Routes
app.get('/', (req, res) => {
  res.send('OpenAI MCP Server est en marche!');
});

// Endpoint pour les requêtes MCP
app.post('/api/mcp', async (req, res) => {
  try {
    const { prompt, model = 'gpt-4', maxTokens = 2000 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Le prompt est requis' });
    }

    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: 'Vous êtes un assistant IA hautement performant qui agit comme un MCP (Master Control Program).' },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
    });

    res.json({
      success: true,
      data: response.choices[0].message.content,
      usage: response.usage
    });
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API OpenAI:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur OpenAI MCP démarré sur le port ${port}`);
});