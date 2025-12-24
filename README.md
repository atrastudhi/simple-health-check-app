# Simple Health Check App

A lightweight Node.js health check application with a single endpoint, built using vanilla Node.js (no external dependencies).

## Features

- Single `/health-check` endpoint
- JSON response format
- Configurable port via environment variable
- Request logging
- Zero dependencies

## Installation

No installation required! This app uses only Node.js built-in modules.

## Usage

### Start the server

```bash
npm start
```

Or run directly:

```bash
node server.js
```

### Custom port

You can specify a custom port using the `PORT` environment variable:

```bash
PORT=8080 node server.js
```

The server defaults to port 3000 if no `PORT` is specified.

## API Endpoint

### GET /health-check

Returns the health status of the application.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-12-24T10:00:00.000Z"
}
```

**Example:**

```bash
curl http://localhost:3000/health-check
```

**Status Code:** 200 OK

## Testing

Once the server is running, you can test the health check endpoint:

```bash
# Using curl
curl http://localhost:3000/health-check

# Using wget
wget -qO- http://localhost:3000/health-check

# Or simply open in your browser
open http://localhost:3000/health-check
```

## Docker

### Build the Docker image

```bash
docker build -t simple-health-check-app .
```

### Run the container

```bash
docker run -p 3000:3000 simple-health-check-app
```

### Run with custom port

```bash
docker run -p 8080:8080 -e PORT=8080 simple-health-check-app
```

### Test the health check endpoint

```bash
curl http://localhost:3000/health-check
```

## Requirements

- Node.js (version 12 or higher recommended)
- Docker (optional, for containerized deployment)

## License

ISC

