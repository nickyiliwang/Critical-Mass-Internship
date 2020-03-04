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
    const className = name.replace(/[^0-9A-Z]+/gi, "");
    getDishImage(name);


    // <img src="${className} card-image" alt="${name}" >

    singleList.innerHTML = `
      <div class="${className} card-image-container"></div>
      <h3 class="${spicy ? "spicy" : ""}">${menuOrder +
      1}. ${name}, $ ${price.toFixed(2)}</h3>
      <p>${description}</p>
      <p>${type}</p>
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
      // const element = document.querySelector(`.${className}`);
      const imageElement = document.createElement("img");
      imageElement.src =
        "https://www.kingarthurflour.com/sites/default/files/styles/featured_image/public/recipe_legacy/20-3-large.jpg?itok=1EY8KWJG";

      const element = document.querySelector(`.${className}`);
      element.appendChild(imageElement);
      console.log(element);
      // default image
      // element.src = `https://www.kingarthurflour.com/sites/default/files/styles/featured_image/public/recipe_legacy/20-3-large.jpg?itok=1EY8KWJG`;

      // if (results[0].image) {
      //   element.src = `${baseUri}${results[0].image}`;
      // }
    })
    .catch(error => console.log("error", error));
};

renderHtmlFromResult(startersResults, starters);
renderHtmlFromResult(pastaResults, pasta);
renderHtmlFromResult(pizzaResults, pizza);
