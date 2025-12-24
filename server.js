const http = require('http');

const { version } = require('./package.json');

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // Handle /health-check endpoint
  if (url === '/health-check' && method === 'GET') {
    const healthResponse = {
      status: 'ok',
      version,
      timestamp: new Date().toISOString()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(healthResponse));
    return;
  }

  // Handle 404 for all other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`Health check server is running on http://localhost:${PORT}`);
  console.log(`Health check endpoint: http://localhost:${PORT}/health-check`);
});

