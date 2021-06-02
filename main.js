const foodForm = document.getElementById('food-form');
const searchButton = document.getElementById('search-button')
foodForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const convertedInput = input.value.replace(/ /g, '%20'); //converts user input into API readable string
  fetchData(convertedInput);
});
searchButton.addEventListener('click', () => {
    const convertedInput = input.value.replace(/ /g, '%20'); //converts user input into API readable string
    fetchData(convertedInput);
});
  

async function fetchData(input) {
    let applicationID = '667d4130';
    let applicationKeys = '469f72b93d7c2fe2d70df2b9de092e25';
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${applicationID}&app_key=${applicationKeys}&ingr=${input}`;

    try {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let data = await response.json();
    console.log(data);
    useData(data);
    } catch(err) {
        alert('Either food does not appear in the database, or description was not specific enough. An example would be "1 apple" or "1 cup eggs')
    }
}
function useData(data) {
    const calories = data.calories;
    const protein = Math.round(JSON.stringify(data.totalNutrients['PROCNT']['quantity'])*10)/10;
    const carbs = Math.round(JSON.stringify(data.totalNutrients['CHOCDF']['quantity'])*10)/10;
    const fat =  Math.round(JSON.stringify(data.totalNutrients['FAT']['quantity'])*10)/10;
  
    document.getElementById('content').style = 'display: block; margin:auto';

    document.getElementById('content').innerHTML = 
    `<div class="card-header text-center">${input.value}</div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" id="calories">Calories: ${calories}</li>
            <li class="list-group-item" id="carbs">Total Carbs: ${carbs}g</li>
            <li class="list-group-item" id="fat">Fat: ${fat}g</li>
            <li class="list-group-item" id="protein">Protein: ${protein}g</li>
        </ul>`;
}
