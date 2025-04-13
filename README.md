# OpenAI MCP

Un serveur simple pour interagir avec les modèles OpenAI comme un Master Control Program (MCP).

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Spysailor/openai-mcp-implementation.git

# Accéder au répertoire
cd openai-mcp-implementation

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditez ensuite le fichier .env et ajoutez votre clé API OpenAI
```

## Utilisation

```bash
# Démarrer le serveur
npm start
```

Le serveur sera accessible à l'adresse http://localhost:3000.

## API

### POST /api/mcp

Envoyer une requête à l'API OpenAI via le MCP.

#### Paramètres de la requête (JSON)

- `prompt` (obligatoire): Le texte à envoyer à l'IA
- `model` (optionnel): Le modèle à utiliser (par défaut: 'gpt-4')
- `maxTokens` (optionnel): Nombre maximum de tokens de réponse (par défaut: 2000)

#### Exemple de requête

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explique-moi comment fonctionne l'intelligence artificielle en 3 paragraphes.",
    "model": "gpt-4",
    "maxTokens": 500
  }'
```

## Licence

MIT