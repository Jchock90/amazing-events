const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const evento = data.events.find(event => event._id == id);

const cardDetail = document.querySelector(".cardDetails");
cardDetail.innerHTML = `
<div class="card" id="cardResponsive" style="width: 20rem; height: 32rem;">
  <div class="card-body" id="twocol">
    <div clclass="col" id="img-details">
      <img src="${evento.image}" class="card-img-top" alt="imageevent" style="object-fit: cover; width: 280px; height: 200px;">
    </div>
    <div class="col" id="text-details">
      <h3 class="card-title">${evento.name}</h5>
      <p class="card-text" id="descriptive">${evento.description}</p>
      <p class="card-text">Place: ${evento.place}</p>
      <p class="card-text">Capacity: ${evento.capacity}</p>
      <p class="card-text">Date: ${evento.date}</p>
      <p class="card-text">Price: $${evento.price}</small></p>
    </div>
  </div>
</div>
 `
