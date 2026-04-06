# Tagus Score

A modern boilerplate project with React frontend and Express backend, both built with TypeScript and Webpack.

## Project Structure

```
.
├── src/
│   ├── client/          # React frontend
│   │   ├── index.tsx
│   │   ├── App.tsx
│   │   └── index.html
│   └── server/          # Express backend
│       └── index.ts
├── dist/                # Build output
├── webpack.config.js    # Webpack configuration
├── tsconfig.json        # TypeScript base config
├── tsconfig.server.json # TypeScript server config
└── package.json
```

## Installation

```bash
bun install
```

## Development

Run both client (dev server on port 3000) and backend (server on port 5000) concurrently:

```bash
bun start
```

Or run them separately:

```bash
bun run dev:client  # Frontend development server
bun run dev:server  # Backend development server
```

## Building

Build both client and server:

```bash
bun run build
```

Or build individually:

```bash
bun run build:client  # Bundle React app
bun run build:server  # Compile TypeScript server
```

## Production

Start the production server:

```bash
bun run build
bun run start:production
```

## Type Checking

Run TypeScript type checking:

```bash
bun run type-check
```

## Technologies

- **Frontend**: React 18, TypeScript, Webpack
- **Backend**: Express, TypeScript, Node.js
- **Build**: Webpack 5, ts-loader
- **Development**: ts-node, webpack-dev-server, concurrently
