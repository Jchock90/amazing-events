let data = JSON.parse(localStorage.getItem("data"));
const currentDate = new Date(data.currentDate);

const upcomingEvents = data.events.filter(({ date }) => new Date(date) > currentDate);
const pastEvents = data.events.filter(({ date }) => new Date(date) < currentDate);

const [highestAttendance, lowestAttendance] = [...data.events].sort((a, b) => b.attendance - a.attendance);

const largestCapacity = [...data.events].sort((a, b) => b.capacity - a.capacity)[0];

const categories = [...new Set(data.events.map(({ category }) => category))];

const getStatsByCategory = (events, property) => categories.map((category) => {
  const categoryEvents = events.filter(({ category: c }) => c === category);
  let revenues = 0;
  let accAttend = 0;
  let contAttend = 0;

  categoryEvents.forEach(event => {
    revenues += event.price * event[property];
    accAttend += ((event[property]*100)/event.capacity);
    contAttend++;
  });

  const attendancePercentage = categoryEvents.length > 0
    ? Math.round((accAttend / contAttend))
    : 0;
  
  const totalRevenues = revenues;
  return { 
    category, 
    revenues: `$${revenues}`,
    attendancePercentage: categoryEvents.length > 0 ? `${attendancePercentage}%` : '0%',
    totalRevenues
  };
});

const upcomingStats = getStatsByCategory(upcomingEvents, "estimate");
const pastStats = getStatsByCategory(pastEvents, "assistance");

const setTableData = (id, { name }) => {
  document.getElementById(id).textContent = name;
};

setTableData("highest-attendance", highestAttendance);
setTableData("lowest-attendance", lowestAttendance);
setTableData("largest-capacity", largestCapacity);

const createTable = (stats) => stats.map(({ category, attendancePercentage, totalRevenues }) => `
  <tr>
    <td>${category}</td>
    <td>$${totalRevenues}</td>
    <td>${attendancePercentage}</td>
  </tr>
`).join("");

document.getElementById("upcomingevents").innerHTML = createTable(upcomingStats);
document.getElementById("pastevents").innerHTML = createTable(pastStats);
