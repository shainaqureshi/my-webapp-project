# AI Assistant Setup - Google Gemini

## Get Your Free API Key

1. Go to **Google AI Studio**: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. **IMPORTANT**: Select "Create API key in new project" if prompted
5. Copy your API key

## Enable the Generative Language API

If you get a 404 error, you need to enable the API:

1. Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Select your project (or the one created with your API key)
3. Click **"Enable"**
4. Wait 1-2 minutes for it to activate

## Add API Key to Your App

### Option 1: Environment Variable (Recommended)
Create a `.env` file in your project root:

```
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

### Option 2: Direct Configuration
Edit `src/config/geminiConfig.js` and replace:
```javascript
apiKey: 'YOUR_GEMINI_API_KEY_HERE'
```
with your actual key.

## Features

The AI Assistant can:
- ✅ Suggest fun goals based on interests
- ✅ Provide motivational messages
- ✅ Give tips for achieving goals
- ✅ Answer questions about the app
- ✅ Chat naturally with kids (ages 8-12)

## Safety Features

- 🔒 Content filtering enabled (blocks inappropriate content)
- 👶 Child-friendly language and tone
- ✅ Age-appropriate goal suggestions only
- 🛡️ Google's built-in safety settings

## Usage

A floating 🤖 button appears in the bottom-right corner for logged-in users. Click it to:
1. Chat with the AI
2. Use quick actions (Suggest goals, Motivate me, Goal tips)
3. Ask any questions about goal-setting

## Free Tier Limits

Google Gemini Free Tier:
- ✅ 60 requests per minute
- ✅ Completely free
- ✅ No credit card required

Perfect for your app!

## Testing

Before deploying, test locally:
```bash
npm start
```

The AI button will show "AI not configured" error if the API key is missing.

## Important Notes

- Keep your API key private (don't commit `.env` to git)
- The `.env` file is already in `.gitignore`
- For production, set environment variables in Firebase Hosting or your deployment platform
