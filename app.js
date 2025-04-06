const Wrapper = document.querySelector(".cards");
// const button = document.querySelector(".btn")

const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";

// function to make api calls / function to fetch data

// unsing asynchrounus function
async function fetchMeals() {
  const response = await fetch(apiUrl); //making api call using fetch method
  const data = await response.json(); //converting response from the api call to string object

  meals = data.categories;

  meals.map((meal) => {
    return createCard(meal);
  });
}

// using try and catch wtih async fucntion
// async function fetchMeals() {
//     try {
//         const response = await fetch(apiUrl); //making api call using fetch method
//         const data = await response.json(); //converting response from the api call to string object
      
//         meals = data.categories;
      
//         console.log(data);
      
//         meals.map((meal) => {
//           return createCard(meal);
//         });
//       } catch (error) {
//           console.log(error);
//       }
// }

// function to create card
function createCard(meal) {
  card = document.createElement("div");

  card.classList.add("cardOne");

  let description = meal.strCategoryDescription.slice(0, 60);

  cardContent = `
              <div class="cardOne">
        <div class="cardImg">
            <img src=${meal.strCategoryThumb} alt="image">
            <button class="btn">
                <img src="./assets/images/icon-add-to-cart.svg" alt="to cart image">
                <p>Add to Cart</p>
            </button>
        </div>
        <div class="cardCont">
            <h3>${meal.strCategory}</h3>
            <p>${description}...</p>
            <span><p>$20.00</p></span>
        </div>
    </div>       
        `;

  card.innerHTML = cardContent;

  Wrapper.appendChild(card);
}

// call the fetch function once the page loads
onload = fetchMeals();