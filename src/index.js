import "./styles.css";
import menu from "./menu";
// DOM Selects
const starters = document.querySelector(".starters-content");
const pasta = document.querySelector(".pasta-content");
const pizza = document.querySelector(".pizza-content");
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
    singleList.className = "masonry-brick";
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

      // default image
      imageElement.src =
        "https://www.kingarthurflour.com/sites/default/files/styles/featured_image/public/recipe_legacy/20-3-large.jpg?itok=1EY8KWJG";

      imageElement.src = `${baseUri}${results[0].image}`;
      imageElement.alt = query;

      if (results[0].image) {
      } else {
        imageElement.src =
          "https://www.kingarthurflour.com/sites/default/files/styles/featured_image/public/recipe_legacy/20-3-large.jpg?itok=1EY8KWJG";
      }
      element.appendChild(imageElement);
    })
    .catch(error => console.log("error", error));
};

renderHtmlFromResult(startersResults, starters);
renderHtmlFromResult(pastaResults, pasta);
renderHtmlFromResult(pizzaResults, pizza);
