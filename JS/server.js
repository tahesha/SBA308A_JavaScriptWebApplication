// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/recipes', async (req, res) => {
  const { query } = req.query;
  const appId = process.env.APP_ID;
  const apiKey = process.env.API_KEY;
  
  try {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?query=${query}&app_id=${appId}&app_key=${apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
