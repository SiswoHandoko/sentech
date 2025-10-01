# Real-time Chat Application

A real-time chat application built with Vue.js, TypeScript, and WebSockets using Socket.io.

## Features

- ✅ Real-time chat using WebSockets
- ✅ Two chat windows that can be opened simultaneously
- ✅ Slide animations for new messages
- ✅ Typing indicators
- ✅ Modern and responsive UI
- ✅ TypeScript for type safety
- ✅ Vue.js 3 with Composition API

## Technologies Used

- **Frontend**: Vue.js 3, TypeScript, Vite
- **Backend**: Node.js, Express, Socket.io
- **Styling**: CSS3 with animations and gradients

## Installation and Running

1. Install dependencies:
```bash
npm install
```

2. Run server and client simultaneously:
```bash
npm run dev
```

Or run separately:

```bash
# Terminal 1 - Server
npm run server

# Terminal 2 - Client
npm run client
```

3. Open browser and access `http://localhost:3000`

4. Click "Open Second Window" button to open second chat window

## How to Use

1. **First Window**: Open `http://localhost:3000`
2. **Second Window**: Click "Open Second Window" button or open `http://localhost:3000?window=2`
3. Each window will have different users automatically
4. Type messages in one window and see them appear in the other window
5. Slide animations will appear when new messages arrive
6. Typing indicators will appear when users are typing

## Project Structure

```
realtime_chat/
├── server/
│   └── index.js          # WebSocket server
├── src/
│   ├── App.vue           # Main component
│   ├── main.ts           # Entry point
│   └── style.css         # Styling
├── package.json
├── vite.config.ts
└── tsconfig.json
```
## Bonus Features

- Responsive design for mobile and desktop
- Auto-scroll to latest messages
- Unique user avatars and names
- Timestamps on each message
- Real-time connection status
- Clean and modern UI with gradient background
