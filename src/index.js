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
    const imageUrl = getDishImage(name);
    const singleList = document.createElement("li");
    const className = name.replace(/[^0-9A-Z]+/gi, "");
    singleList.className = className;
    singleList.innerHTML = `
      <h3 class="${spicy ? "spicy" : ""}">${menuOrder + 1}. ${name}</h3>
      <p>${description}</p>
      <p>${type}</p>
      <p>$ ${price.toFixed(2)}</p>
      <img src=${imageUrl} alt="${name}">
  `;
    element.appendChild(singleList);
  });
};

const getDishImage = query => {
  const className = query.replace(/[^0-9A-Z]+/gi, "");
  const searchQuery = query.replace(/\s/g, "-");
  console.log(query);

  fetch(
    `https://api.unsplash.com/search/photos?client_id=WmhoLo_j2TMfoiPS5UO0Y1IR84cA8Nvi0_BhHn7MYJ8&query=${searchQuery}`
  )
    .then(res => res.json())
    .then(result => {
      const element = document.querySelector(`.${className}`);
      element.style.backgroundImage = `url(${result.results[0].urls.small})`;
    })
    .catch(error => console.log("error", error));
};

renderHtmlFromResult(startersResults, starters);
renderHtmlFromResult(pastaResults, pasta);
renderHtmlFromResult(pizzaResults, pizza);
