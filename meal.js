document.getElementById("getMeal").addEventListener("click", fetchMeal);

function fetchMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
                }
            }

            document.getElementById("mealContainer").innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>Ingredients</h3>
                <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
                <a href="${meal.strYoutube}" target="_blank">Watch Recipe on YouTube</a>
            `;
        })
        .catch(error => console.error("Error fetching meal:", error));
}