import "./styles.css";
import menu from "./menu";
// DOM Selects
const starters = document.querySelector(".starters-content");
const pasta = document.querySelector(".pasta-content");
const pizza = document.querySelector(".pizza-content");
const spicyCheckbox = document.querySelector(".spicy-checkbox");
// menu database
const menuItems = menu.items;

const menuFilterAndSort = itemName => {
  const filterResult = menuItems.filter(item => item.type === itemName);
  const sortedFilterResults = filterResult.sort(
    (a, b) => a.menuOrder - b.menuOrder
  );
  return sortedFilterResults;
};

const startersResults = menuFilterAndSort("starters");
const pastaResults = menuFilterAndSort("pasta");
const pizzaResults = menuFilterAndSort("pizza");

const renderHtmlFromResult = (result, element) => {
  result.forEach(({ name, description, type, price, spicy, menuOrder }) => {
    const singleList = document.createElement("li");
    spicy ? (singleList.className = "spicyToggle") : null;
    const className = name.replace(/[^0-9A-Z]+/gi, "");
    getDishImage(name);

    singleList.innerHTML = `
     <div class="${className} card-image-container"></div>
     <div class="card-content-container">
     <h3 class="${spicy ? "spicy" : ""}">${menuOrder +
      1}. ${name}, $ ${price.toFixed(2)}</h3>
      <p>${description}</p>
     </div>
  `;
    element.appendChild(singleList);
  });
};

const getDishImage = query => {
  const className = query.replace(/[^0-9A-Z]+/gi, "");

  fetch(
    `https://api.spoonacular.com/recipes/search?query=${query}&apiKey=0ac0f286289944a88643c4cd6c7c4ae2`
  )
    .then(res => res.json())
    .then(({ baseUri, results }) => {
      const imageElement = document.createElement("img");
      const element = document.querySelector(`.${className}`);

      // image fetch has no results
      if (results === undefined || results.length === 0) {
        imageElement.src =
          "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-750%2Fd29%2Fgrandma-style-pizza-103321886%2Fgrandma-style-pizza-103321886_horiz.jpg%3Fitok%3Dw9IrbEmy";
      } else {
        // using the first image
        imageElement.src = `${baseUri}${results[0].image}`;
      }
      imageElement.alt = query;

      element.appendChild(imageElement);
    })
    .catch(error => console.error("error", error));
};

renderHtmlFromResult(startersResults, starters);
renderHtmlFromResult(pastaResults, pasta);
renderHtmlFromResult(pizzaResults, pizza);

// spice filter

spicyCheckbox.addEventListener("change", function() {
  const spicyFoods = document.querySelectorAll(".spicyToggle");

  if (!this.checked) {
    spicyFoods.forEach(spicyFood => (spicyFood.style.display = "none"));
  } else {
    spicyFoods.forEach(spicyFood => (spicyFood.style.display = "block"));
  }
});
