let htmlEvents = "";
for (let event of data.events) {
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);
    if (eventDate > currentDate) {
        htmlEvents += `<div class="card" style="width: 16rem; height: 22rem;">
        <div class="card-body">
        <img src="${event.image}" class="card-img-top" alt="imageevent" style="object-fit: cover; width: 220px; height: 100px;">
        <h3 class="">${event.name}</h3>
        <p class="">${event.description}</p>
        <span>Price: $${event.price}</span><a href="./details.html" class="btn btn-primary btn-sm">Details</a>
        </div>
        </div>`;
    }
}
document.querySelector('div.row').innerHTML += htmlEvents;