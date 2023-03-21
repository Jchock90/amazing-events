let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

async function loadData() {
  try {
    const response = await fetch(urlAPI);
    const json = await response.json();
    localStorage.setItem("data", JSON.stringify(json));
    const data = JSON.parse(localStorage.getItem("data"));
  } catch (error) {
    console.log(`Ups, error: ${error.message}`);
  }
}

loadData();

