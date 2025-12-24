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

## CI/CD Workflows

Two GitHub Actions workflows handle versioning, building, and deployment.

### Build and Release

Runs automatically when you push to master.

What happens:
- Detects version bump type from your commit message (feat = minor, fix/chore = patch, BREAKING CHANGE = major)
- Updates version in package.json
- Builds Docker image
- Pushes image to GHCR with version tag (e.g., v1.0.8)
- Commits the version bump
- Tags the commit

Your commit message determines the version:
- `feat: add something` → minor bump (1.0.0 → 1.1.0)
- `fix: bug fix` → patch bump (1.0.0 → 1.0.1)
- `feat!: breaking change` → major bump (1.0.0 → 2.0.0)

### Deploy to Production

Runs automatically after Build and Release.

What happens:
- Removes any existing `-released` tags
- Pulls the version image that was just built
- Tags it with `-released` suffix (e.g., v1.0.8-released)
- Pushes the tagged image

The `-released` tag marks which version is currently deployed. Only one exists at a time.

### Rollback

To deploy an older version:

1. Go to GitHub Actions
2. Find the "Deploy to Production" workflow for the version you want
3. Click "Re-run jobs" → "Re-run deploy jobs"

Takes about 30 seconds. No rebuild needed since the image already exists.

### Image Tags

- `v1.0.8` - The actual version, never deleted
- `v1.0.8-released` - Currently deployed version, moves between versions
- `buildcache` - Build cache for faster builds

## Requirements

- Node.js (version 12 or higher recommended)
- Docker (optional, for containerized deployment)

## License

ISC

