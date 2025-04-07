const Wrapper = document.querySelector(".cards");
const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
let cart = []; // Array to store cart items

// Fetch meals from API
async function fetchMeals() {
  try {
    const response = await fetch(apiUrl); // Make API call using fetch method
    const data = await response.json(); // Convert response to JSON
    const meals = data.categories;

    // Create a card for each meal category
    meals.map((meal) => createCard(meal));
  } catch (error) {
    console.error("Error fetching meals:", error); // Handle errors
  }
}

// Function to create card for each meal category
function createCard(meal) {
  const card = document.createElement("div");
  card.classList.add("cardOne");

  let description = meal.strCategoryDescription.slice(0, 60); // Shorten description for display

  const cardContent = `
    <div class="cardImg">
        <img src="${meal.strCategoryThumb}" alt="image of ${meal.strCategory}">
        <button class="btn" data-name="${meal.strCategory}" data-price="20.00">
            <img src="./assets/images/icon-add-to-cart.svg" alt="Add to Cart">
            <p>Add to Cart</p>
        </button>
    </div>
    <div class="cardCont">
        <h3>${meal.strCategory}</h3>
        <p>${description}...</p>
        <span><p>$20.00</p></span>
    </div>
  `;

  card.innerHTML = cardContent;
  Wrapper.appendChild(card);

  // Add event listener to the "Add to Cart" button
  const addToCartBtn = card.querySelector(".btn");
  addToCartBtn.addEventListener("click", () => addToCart(meal.strCategory, 20.00));
}

// Function to add item to the cart
function addToCart(name, price) {
  // Check if item already exists in the cart
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity if already in the cart
  } else {
    cart.push({ name, price, quantity: 1 }); // Add new item to the cart
  }
  updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
  const cartContainer = document.querySelector(".cartCard");
  cartContainer.innerHTML = `<h3>Your Cart (${cart.length})</h3>`;

  if (cart.length === 0) {
    cartContainer.innerHTML += `
      <div class="yourCartImg">
          <img src="./assets/images/illustration-empty-cart.svg" alt="your cart image">
      </div>
      <p>Your added meals will appear here</p>
    `;
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cartItem");

      cartItem.innerHTML = `
        <div class="cartItemDetails">
          <h4>${item.name}</h4>
          <p>$${item.price} x ${item.quantity}</p>
        </div>
        <div class="cartItemQuantity">
          <button class="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="increase">+</button>
        </div>
      `;

      cartItem.querySelector(".increase").addEventListener("click", () => updateItemQuantity(item.name, 1));
      cartItem.querySelector(".decrease").addEventListener("click", () => updateItemQuantity(item.name, -1));

      cartContainer.appendChild(cartItem);
    });

    cartContainer.innerHTML += `<button class="checkoutBtn">Checkout</button>`;
  }
}

// Function to update item quantity in the cart
function updateItemQuantity(itemName, change) {
  const item = cart.find(item => item.name === itemName);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.name !== itemName); // Remove item if quantity is 0
    }
    updateCartDisplay();
  }
}

// Call fetchMeals once the page loads
document.addEventListener("DOMContentLoaded", fetchMeals);
