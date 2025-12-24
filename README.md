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

This project uses a two-workflow architecture for building and deploying Docker images to GitHub Container Registry (GHCR).

### Workflow Architecture

#### 1. Version Bump Workflow (`version-bump.yaml`)

**Trigger**: Automatically on push to `master` branch

**What it does**:
- Bumps the patch version in `package.json`
- Creates a commit with message: `chore: release vX.X.X [skip ci]`
- Creates a git tag `vX.X.X`
- Pushes commit and tag to trigger the build workflow

#### 2. Build and Deploy Workflow (`build-deploy.yaml`)

**Trigger**: Automatically when commits starting with `chore: release` are pushed

**Build Job**:
- Extracts version from `package.json`
- Builds Docker image
- Pushes image with version tag only (e.g., `v1.0.8`)
- Uses build cache for efficiency

**Deploy Job** (runs after build):
- Removes all existing `-released` tags from GHCR
- Pulls the newly built version image
- Tags it with `-released` suffix (e.g., `v1.0.8-released`)
- Pushes the `-released` tag

### Image Tagging Strategy

**Base version tags** (e.g., `v1.0.8`):
- Created by the build job
- Never deleted
- Permanent record of all built versions

**Release tags** (e.g., `v1.0.8-released`):
- Created by the deploy job
- Marks which version is currently deployed
- Only one `-released` tag exists at a time
- Your deployment system should pull images with this suffix

### Normal Release Flow

```
1. Push code to master
   ↓
2. Version bump workflow runs
   → Bumps version to v1.0.8
   → Commits "chore: release v1.0.8 [skip ci]"
   → Pushes commit and tag
   ↓
3. Build and Deploy workflow triggers
   → Build job: Builds and pushes v1.0.8
   → Deploy job: Tags v1.0.8-released
   ↓
4. Image v1.0.8-released is ready for deployment
```

### Rollback/Redeploy Process

To rollback or redeploy a previous version:

1. Go to **GitHub Actions** tab in your repository
2. Find the **"Build and Deploy"** workflow run for the version you want to deploy
3. Click on the workflow run (e.g., for v1.0.5)
4. Click **"Re-run jobs"** dropdown
5. Select **"Re-run deploy jobs"** (only the deploy job, not build)
6. The deploy job will:
   - Remove the current `-released` tag
   - Pull the v1.0.5 image (already built)
   - Tag it as v1.0.5-released
   - Push the new `-released` tag

**Time to rollback**: ~30 seconds (no rebuild required!)

### Example Scenarios

**Scenario 1: Deploy latest version**
```
Push code → Auto-bumps to v1.0.9 → Builds and deploys v1.0.9-released
```

**Scenario 2: Rollback to previous version**
```
Go to Actions → Find v1.0.7 workflow → Re-run deploy job
Result: v1.0.7-released is now the deployed version
```

**Scenario 3: Redeploy current version**
```
Go to Actions → Find current version workflow → Re-run deploy job
Result: Re-applies -released tag (useful after manual registry cleanup)
```

### Benefits

- ✅ **Fast rollbacks**: 30 seconds vs 2-3 minutes for rebuild
- ✅ **No rebuilds needed**: Just re-tag existing images
- ✅ **Version history**: All built versions remain in registry
- ✅ **Clean deployment marker**: Single `-released` tag shows what's deployed
- ✅ **Audit trail**: All deployments visible in workflow history

## Requirements

- Node.js (version 12 or higher recommended)
- Docker (optional, for containerized deployment)

## License

ISC

