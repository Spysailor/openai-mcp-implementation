# MCP pour OpenAI et Claude

Un serveur simple qui agit comme un Master Control Program (MCP) pour interagir avec les modèles d'IA d'OpenAI et d'Anthropic (Claude).

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
# Éditez ensuite le fichier .env et ajoutez vos clés API
```

## Configuration

Éditez le fichier `.env` pour ajouter vos clés API :

```
# Configuration pour MCP
PORT=3000
OPENAI_API_KEY=votre_clé_api_openai_ici
ANTHROPIC_API_KEY=votre_clé_api_claude_ici
```

## Utilisation

```bash
# Démarrer le serveur
npm start
```

Le serveur sera accessible à l'adresse http://localhost:3000.

## API

### POST /api/mcp

Endpoint unifié qui détecte automatiquement le fournisseur en fonction du modèle demandé.

#### Paramètres de la requête (JSON)

- `prompt` (obligatoire): Le texte à envoyer à l'IA
- `model` (optionnel): Le modèle à utiliser (par défaut: 'gpt-4' pour OpenAI)
- `maxTokens` (optionnel): Nombre maximum de tokens de réponse (par défaut: 2000)
- `provider` (optionnel): Le fournisseur à utiliser ('openai', 'claude', ou 'auto' pour détection automatique)

#### Exemple de requête

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explique-moi comment fonctionne l'intelligence artificielle en 3 paragraphes.",
    "model": "gpt-4",
    "maxTokens": 500,
    "provider": "auto"
  }'
```

### POST /api/mcp/openai

Endpoint spécifique à OpenAI.

#### Paramètres identiques à /api/mcp, mais toujours dirigés vers OpenAI.

### POST /api/mcp/claude

Endpoint spécifique à Claude.

#### Paramètres identiques à /api/mcp, mais toujours dirigés vers Claude.

## Interface de test

Une interface web simple est incluse pour tester le MCP. Ouvrez le fichier `test-mcp.html` dans votre navigateur pour l'utiliser.

## Modèles supportés

### OpenAI
- gpt-4
- gpt-4-turbo
- gpt-3.5-turbo
- et autres modèles OpenAI...

### Claude (Anthropic)
- claude-3-opus-20240229
- claude-3-sonnet-20240229
- claude-3-haiku-20240307
- et autres modèles Claude...

## Licence

MIT