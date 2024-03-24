import menuArray from "./data.js";

const foods = document.getElementById("foods");
const checkout = document.getElementById("checkout");
const orderContainer = document.getElementById("order-container")
const totalPriceEl = document.getElementById("total-price")
const cardDetails = document.getElementById("card-details")
const cardName = document.getElementById("card-name")
let checkoutArr = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    setCheckout(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemove(e.target.dataset.remove);
  } else if (e.target.id === "complete-btn"){
    cardDetails.style.display = "flex"
  }
});

cardDetails.addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutArr = [];
  cardDetails.style.display = "none"
  checkout.innerHTML = `<p class="complete-msg">Thanks, ${cardName.value}! Your order is on its way!</p>`
})


// display foods function
function renderFoods() {
  let menuItems = "";

  menuArray.forEach((item) => {
    menuItems += `<div class="food-box">
                <div class="food-emoji-box">
                    ${item.emoji}
                </div>
                <div class="food-detail">
                    <h2>${item.name}</h2>
                    <p>${item.ingredients}</p>
                    <p>$${item.price}</p>
                </div>
                <button class="add-btn" data-add="${item.id}">+</button>
            </div>`;
  });
  foods.innerHTML = menuItems;
}

// calling it to display foods menu
renderFoods();

// set checkout function
function setCheckout(currentId) {
  const targetMenuObj = menuArray.filter((item) => {
    return item.id == currentId;
  })[0];
  checkoutArr.push(targetMenuObj);
  renderCheckout(checkoutArr);
}


// render checkout
function renderCheckout(arr) {
  if(checkoutArr.length > 0){
    checkout.style.display = "block"
    let checkoutItem = "";
    let totalPrice = 0;
  arr.forEach((item, index) => {
    totalPrice += item.price
    checkoutItem += `<div class="order-box">
                      <p class="order-name">${item.name} <button class="remove-btn" data-remove=${index}>remove</button></p>
                      <p>$${item.price}</p>
                    </div>`;
  });
  orderContainer.innerHTML = checkoutItem;
  totalPriceEl.textContent = `$${totalPrice}`
  } else{
    checkout.style.display = "none"
  }
}


// setting function for remove
function handleRemove(indexValue) {
  checkoutArr.splice(indexValue, 1);
  renderCheckout(checkoutArr);
}
