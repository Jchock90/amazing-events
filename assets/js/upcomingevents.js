const generateCard = (event) => `
  <div class="card" style="width: 16rem; height: 22rem;">
    <div class="card-body">
      <img src="${event.image}" class="card-img-top" alt="imageevent" style="object-fit: cover; width: 220px; height: 100px;">
      <h3 class="">${event.name}</h3>
      <p class="">${event.description}</p>
      <span>Price: $${event.price}</span>
      <a href="./details.html?id=${event._id}" class="btn btn-primary btn-sm">Details</a>
    </div>
  </div>
`;

const cardContainer = document.getElementById("card");
const currentDate = new Date(data.currentDate);

const htmlEvents = data.events
  .filter(event => new Date(event.date) <  currentDate)
  .map(event => generateCard(event))
  .join("");
cardContainer.innerHTML = htmlEvents;

const categories = [...new Set(data.events.map(event => event.category))];

const newCheckbox = (category) => `
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="checkbox${category}" value="${category}" name="category">
    <label class="form-check-label" for="checkbox${category}">${category}</label>
  </div>
`;

const checkbox = document.getElementById("checkbox");
const htmlCheckbox = categories.map(category => newCheckbox(category)).join("");
checkbox.innerHTML = htmlCheckbox;

const categoryCheckboxes = document.querySelectorAll(".form-check-input");

categoryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const categories = [...categoryCheckboxes]
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    
let HTMLresults = "";
const filteredEvents = data.events.filter(event => 
  categories.includes(event.category) && new Date(event.date) < currentDate);
  if (filteredEvents.length > 0) {
    HTMLresults = filteredEvents.map(event => generateCard({...event})).join("");
  } else {
    HTMLresults = "<p>No events found for the selected categories</p>";
  }
  cardContainer.innerHTML = HTMLresults;
  });
});

const form = document.querySelector("#search");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const inputSearch = document.getElementById("search");
document.querySelector("#form-search").addEventListener("submit", (e) => {
  e.preventDefault();
  
const textIn = inputSearch.value.toLowerCase();
const results = data.events.filter(event => 
  event.name.toLowerCase().includes(textIn) ||
  event.description.toLowerCase().includes(textIn) && new Date(event.date) < currentDate);

let HTMLresults = "";
  if (results.length > 0) {
    HTMLresults = results.map(event => generateCard({...event})).join("");
  } else {
    HTMLresults = "<p>No events found for the selected categories</p>";
  }
  cardContainer.innerHTML = HTMLresults;
});
