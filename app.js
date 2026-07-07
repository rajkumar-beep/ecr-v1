const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Main route - proves the container is serving traffic
app.get('/', (req, res) => {
  res.send('Hello from ECS! Build: ' + (process.env.BUILD_NUMBER || 'local'));
});

// Health check - ECS/ALB will hit this to know if the container is alive
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
