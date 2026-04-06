# Tagus Score - Development Guidelines

This is a React + Express + TypeScript boilerplate project.

## Project Structure

- `src/client/` - React frontend application
- `src/server/` - Express backend API
- `webpack.config.js` - Webpack bundling configuration for React
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.server.json` - Server-specific TypeScript configuration

## Development Workflow

### Setup

```bash
bun install
```

### Running Locally

- **Development mode (both client and server)**:

  ```bash
  bun start
  ```

  - Frontend runs on `http://localhost:3000`
  - Backend runs on `http://localhost:5000`

- **Client only**:

  ```bash
  bun run dev:client
  ```

- **Server only**:
  ```bash
  bun run dev:server
  ```

### Building

```bash
bun run build          # Build both client and server
bun run build:client   # Build React app only
bun run build:server   # Compile server TypeScript only
```

### Production

```bash
bun run build
bun run start:production
```

## Key Technologies

- **React 18** - UI framework
- **Express** - Backend framework
- **TypeScript** - Static typing
- **Webpack 5** - Module bundler
- **ts-node** - TypeScript Node.js runner
- **webpack-dev-server** - Development server with hot reload

## Code Style

- Use TypeScript for all new code in both client and server
- Follow React functional components with hooks pattern
- Use `.tsx` for React components and `.ts` for utilities/types
- Maintain strict TypeScript settings in `tsconfig.json`

## API Endpoints

Current endpoints:

- `GET /` - Welcome message
- `GET /api/health` - Health check

## Adding Dependencies

```bash
bun add <package>            # Production dependency
bun add --save-dev <package> # Development dependency
```
