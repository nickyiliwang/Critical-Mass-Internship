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

startersResults.forEach(
  ({ name, description, type, price, spicy, menuOrder }) => {
    let singleList = document.createElement("li");
    singleList.innerHTML = `
        <h2>${name}</h2>
        <p>${description}</p>
        <p>${type}</p>
        <p>$ ${price}</p>
        <p>Spicy? ${spicy}</p>
`;

    starters.appendChild(singleList);
  }
);
