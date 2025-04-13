// Serveur MCP pour OpenAI et Claude
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const { Anthropic } = require('@anthropic-ai/sdk');

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

// Initialisation de Claude (Anthropic)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Routes
app.get('/', (req, res) => {
  res.send('MCP Server pour OpenAI et Claude est en marche!');
});

// Endpoint pour les requêtes OpenAI
app.post('/api/mcp/openai', async (req, res) => {
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
      provider: 'openai',
      data: response.choices[0].message.content,
      usage: response.usage
    });
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API OpenAI:', error);
    res.status(500).json({
      success: false,
      provider: 'openai',
      error: error.message
    });
  }
});

// Endpoint pour les requêtes Claude (Anthropic)
app.post('/api/mcp/claude', async (req, res) => {
  try {
    const { prompt, model = 'claude-3-opus-20240229', maxTokens = 2000 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Le prompt est requis' });
    }

    const response = await anthropic.messages.create({
      model,
      max_tokens: maxTokens,
      system: 'Vous êtes un assistant IA hautement performant qui agit comme un MCP (Master Control Program).',
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    res.json({
      success: true,
      provider: 'claude',
      data: response.content[0].text,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens
      }
    });
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API Claude:', error);
    res.status(500).json({
      success: false,
      provider: 'claude',
      error: error.message
    });
  }
});

// Endpoint unifié pour les requêtes MCP (détecte automatiquement le modèle)
app.post('/api/mcp', async (req, res) => {
  try {
    const { prompt, model = 'gpt-4', maxTokens = 2000, provider = 'auto' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Le prompt est requis' });
    }

    // Déterminer le fournisseur basé sur le modèle ou la préférence
    let selectedProvider = provider;
    if (provider === 'auto') {
      if (model.includes('claude')) {
        selectedProvider = 'claude';
      } else {
        selectedProvider = 'openai';
      }
    }

    // Rediriger vers le bon endpoint
    if (selectedProvider === 'claude') {
      // Appel à Claude API
      const response = await anthropic.messages.create({
        model: model.includes('claude') ? model : 'claude-3-opus-20240229',
        max_tokens: maxTokens,
        system: 'Vous êtes un assistant IA hautement performant qui agit comme un MCP (Master Control Program).',
        messages: [
          { role: 'user', content: prompt }
        ]
      });

      res.json({
        success: true,
        provider: 'claude',
        model: model.includes('claude') ? model : 'claude-3-opus-20240229',
        data: response.content[0].text,
        usage: {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens
        }
      });
    } else {
      // Appel à OpenAI API
      const response = await openai.chat.completions.create({
        model: model.includes('claude') ? 'gpt-4' : model,
        messages: [
          { role: 'system', content: 'Vous êtes un assistant IA hautement performant qui agit comme un MCP (Master Control Program).' },
          { role: 'user', content: prompt }
        ],
        max_tokens: maxTokens,
      });

      res.json({
        success: true,
        provider: 'openai',
        model: model.includes('claude') ? 'gpt-4' : model,
        data: response.choices[0].message.content,
        usage: response.usage
      });
    }
  } catch (error) {
    console.error('Erreur lors de la requête au MCP:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur MCP démarré sur le port ${port}`);
  console.log(`- OpenAI API: ${process.env.OPENAI_API_KEY ? 'Configurée' : 'Non configurée'}`);
  console.log(`- Claude API: ${process.env.ANTHROPIC_API_KEY ? 'Configurée' : 'Non configurée'}`);
});