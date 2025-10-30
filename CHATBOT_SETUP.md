# AI Chatbot Setup Guide

This application now includes an AI-powered chatbot using Google's Gemini API.

## 🔒 Security

The API key is stored securely on the server side, NOT in the client code. This prevents exposure of the API key in the browser.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install both client and server dependencies, including:
- `express` - Server framework
- `cors` - CORS middleware
- `dotenv` - Environment variable management
- `@google/generative-ai` - Google Gemini AI SDK
- `concurrently` - Run multiple commands concurrently

### 2. Environment Variables

The `.env` file has already been created with your API key. For future reference or deployment:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=3001
   ```

⚠️ **Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

### 3. Running the Application

#### Option 1: Run Both Client and Server Together (Recommended)

```bash
npm run dev:all
```

This will start:
- React app on `http://localhost:5173`
- Express server on `http://localhost:3001`

#### Option 2: Run Separately

**Terminal 1 - Start the server:**
```bash
npm run server
```

**Terminal 2 - Start the client:**
```bash
npm run dev
```

## 🎯 Using the Chatbot

1. Look for the floating AI chat button in the bottom-right corner of the screen
2. Click it to open the chat window
3. Type your message and press Enter or click the send button
4. The AI will respond using Google's Gemini model

## 🏗️ Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React     │         │   Express   │         │   Gemini    │
│   Client    │────────▶│   Server    │────────▶│   API       │
│             │ /api/   │  (Proxy)    │  API    │             │
│             │  chat   │             │  Key    │             │
└─────────────┘         └─────────────┘         └─────────────┘
```

1. User sends message in React app
2. React app sends POST request to `/api/chat`
3. Vite proxy forwards to Express server (localhost:3001)
4. Express server adds API key and calls Gemini API
5. Response flows back to user

## 📁 New Files Created

- `server.js` - Express server with Gemini API integration
- `.env` - Environment variables (API key)
- `.env.example` - Template for environment variables
- `src/components/Chatbot.jsx` - Alternative chatbot component
- `src/components/Chatbot.css` - Chatbot styles

## 🔧 Modified Files

- `package.json` - Added server dependencies and scripts
- `vite.config.js` - Added API proxy configuration
- `src/components/AIChatbot.jsx` - Updated to use Gemini API
- `.gitignore` - Added .env to ignore list

## 🛠️ Troubleshooting

### "Failed to send message"
- Ensure the Express server is running (`npm run server`)
- Check that port 3001 is not in use by another application

### "API Error"
- Verify your API key in `.env` file
- Check your internet connection
- Ensure the Gemini API is accessible

### Proxy Issues
- Clear browser cache
- Restart both client and server
- Check that `vite.config.js` has correct proxy settings

## 🔐 Production Deployment

For production deployment:

1. **Never expose your API key in client-side code**
2. Use environment variables on your hosting platform
3. Consider rate limiting on the server
4. Add authentication if needed
5. Use HTTPS for all API calls

## 📝 API Endpoints

### POST /api/chat
Send a message to the AI chatbot

**Request Body:**
```json
{
  "message": "Your message here",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "success": true,
  "response": "AI response text"
}
```

### GET /api/health
Check server status

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 📚 Additional Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Vite Proxy Configuration](https://vitejs.dev/config/server-options.html#server-proxy)
