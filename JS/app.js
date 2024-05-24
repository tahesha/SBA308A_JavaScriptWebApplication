// Import Axios library for making HTTP requests
// const axios = require('axios'); COMMENTED this line of code because it caused the browser to throw an error. The error "Uncaught ReferenceError: require is not defined" indicates that the require function, which is commonly used in Node.js environments for importing modules, is not recognized in the browser environment. This is because the browser does not support the CommonJS module system used by Node.js out of the box. To fix this issue, I had to modify the JavaScript code to ensure compatibility with the browser environment. Instead of using require to import modules, I had to use other methods such as script tags to include external scripts or use ES6 modules.
// Import dotenv library for loading environment variables from .env file
// require('dotenv').config();


//ADDED
// Import Axios library for making HTTP requests
import axios from 'axios';
// Import dotenv library for loading environment variables from .env file
//import 'dotenv/config'; //COMMENTED this line of code because it was causing an error "Uncaught SyntaxError: Cannot use import statement outside a module". To fix this error, I had to handle environment variables differently.

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
// console.log('API_KEY:', process.env.API_KEY); COMMENTED this line of code because it was causing an error "Uncaught ReferenceError: process is not defined". To fix this error, I had to include the API key directly in the JavaScript code.
console.log('API_KEY:', 'YOUR_API_KEY'); // Replace 'YOUR_API_KEY' with your actual API key
