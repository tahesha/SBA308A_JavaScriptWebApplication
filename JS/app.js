// Load environment variables from .env file
require('dotenv').config();

// Require node-fetch to make HTTP requests
const fetch = require('node-fetch');

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const query = searchInput.value.trim();

    try {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=any&q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
    }
});

function displayRecipes(recipes) {
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <h2>${recipe.recipe.label}</h2>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        `;
        recipeContainer.appendChild(recipeElement);
    });
}
