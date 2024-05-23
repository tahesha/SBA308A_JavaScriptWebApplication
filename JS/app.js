// Import Axios library for making HTTP requests
const axios = require('axios');
// Import dotenv library for loading environment variables from .env file
require('dotenv').config();

// Define variables
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');

// Define event listener for form submission
searchForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get search query from input field
    const query = searchInput.value.trim();

    // Call function to fetch recipes
    await fetchRecipes(query);
});

// Define function to fetch recipes from API
async function fetchRecipes(query) {
    try {
        // Retrieve API key from environment variables
        const apiKey = process.env.API_KEY;

        // Make GET request to the Edamam API
        const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=YOUR_APP_ID&app_key=${apiKey}`);

        // Display recipes in the recipe container
        displayRecipes(response.data.hits);
    } catch (error) {
        // Handle errors
        console.error('Error fetching recipes:', error.message);
    }
}

// Define function to display recipes in the recipe container
function displayRecipes(recipes) {
    // Clear previous results
    recipeContainer.innerHTML = '';

    // Loop through recipes and create HTML elements to display each recipe
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

console.log('Script loaded successfully');

// Log the API key from environment variables
console.log('API_KEY:', process.env.API_KEY);
