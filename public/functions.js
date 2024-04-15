console.log("El archivo JavaScript se vinculó correctamente.");

// Get the modal element
var modal = document.querySelector('.modal');
// Get all cards
var cards = document.querySelectorAll('.card');

// Loop through each card and add click event listener
cards.forEach(function(card) {
    card.addEventListener('click', function() {
        // Get full cocktail data associated with the clicked card

            // Get the data attribute value containing the JSON string
            var cocktailData = card.getAttribute('data-cocktail');

            // console log to make sure it's coming up in a correct format
            // console.log('JSON String:', cocktailData);
            
            // Proceed with parsing and populating the modal
            populateModal(JSON.parse(cocktailData));
            

        // Show the modal
        modal.style.display = 'block';


    });
});

// Function to populate the modal with cocktail details
function populateModal(cocktailData) {
    // Populate modal with cocktail details
    document.getElementById('modal-cocktail-image').src = cocktailData.strDrinkThumb;
    document.getElementById('modal-cocktail-name').textContent = cocktailData.strDrink;
    document.getElementById('modal-cocktail-description').textContent = cocktailData.strInstructions;

    // Clear the ingredient list so it's a new one for every modal
    var ingredientList = document.getElementById('modal-cocktail-ingredients');
    ingredientList.innerHTML = '';

    // Loop through ingredients and measures
    for (var i = 1; i <= 15; i++) {
        var ingredient = cocktailData['strIngredient' + i];
        var measure = cocktailData['strMeasure' + i];

        // If ingredient is not null and not an empty string
        if (ingredient && ingredient.trim() !== '') { 
        // Here we use the .trim to remove all whitespaces and then check (!== '') it is not null or empty, since the list could have a lot of null characthers
        // So this !== '' is to confirm it is not empty, in case its not, then the statement is true and it runs for every i 


            // Create list item element
            var listItem = document.createElement('li');

            // Concatenate ingredient and measure
            var ingredientText = measure ? measure + ' ' + ingredient : ingredient; // Ternary operator
            // So here we use measure ? measure to check it is not null or empty and concatenate w ingredient, if not (:) we assign only the ingredient to ingredientText
            //This works like an if-else statement, if measure ? is true, then concatenate, if not then just assign the ingredient, that we know exist bc we prev made it sure in our if where used the .trim method

            // Set text content of list item
            listItem.textContent = ingredientText;

            // Append list item to ingredient list
            ingredientList.appendChild(listItem);
        }
    }


    // Add more details as needed
}

// Close the modal when the close button is clicked
document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close the modal when the user clicks outside of it
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
