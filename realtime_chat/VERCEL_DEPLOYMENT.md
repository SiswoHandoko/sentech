# Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. **Connect GitHub Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings:**
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables:**
   - `NODE_ENV`: `production`

4. **Deploy:**
   - Click "Deploy"

## Project Structure for Vercel

```
realtime_chat/
├── server/
│   └── index.js          # WebSocket server
├── src/
│   ├── App.vue           # Main component
│   ├── main.ts           # Entry point
│   ├── style.css         # Styling
│   └── vue-shim.d.ts    # Vue type declarations
├── package.json
├── vercel.json           # Vercel configuration
├── vite.config.ts
└── tsconfig.json
```

## Features

- ✅ Real-time WebSocket communication
- ✅ Vue.js 3 + TypeScript
- ✅ Modern UI with animations
- ✅ Dual window chat support
- ✅ Typing indicators
- ✅ Responsive design

## Live Demo

After deployment, your app will be available at:
- **Frontend**: `https://your-project.vercel.app`
- **WebSocket**: `https://your-project.vercel.app/socket.io`

## Troubleshooting

### WebSocket Issues:
- Ensure `vercel.json` routes are configured correctly
- Check that Socket.io is properly configured for production

### Build Issues:
- Make sure all dependencies are in `package.json`
- Verify TypeScript configuration is correct
