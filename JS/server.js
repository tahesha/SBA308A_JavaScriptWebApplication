const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const query = searchInput.value.trim();

    try {
        const response = await fetch(`/recipes?query=${query}`);
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