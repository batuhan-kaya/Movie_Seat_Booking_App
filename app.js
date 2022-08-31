const container = document.querySelector(".container"),
  seats = document.querySelectorAll(".row .seat:not(.occupied)"), // silinebilir
  count = document.getElementById("count"),
  total = document.getElementById("total"),
  movieSelect = document.getElementById("movie"),
  screen = document.getElementById("screen"),
  buttons = document.getElementById("buttons");

movieTheater();

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateMovieTheater();
  resetData();
});

//movie theater change
function updateMovieTheater() {
  let optionID = movieSelect.options[movieSelect.selectedIndex].getAttribute("id");

  if (optionID === "movieTheater1") {
    screen.style.backgroundImage = "url(./images/airplane.jpg)";
    movieTheater();
  } else if (optionID === "movieTheater2") {
    screen.style.backgroundImage = "url(./images/thesquare.jpg)";
    movieTheater(5);
  } else if (optionID === "movieTheater3") {
    screen.style.backgroundImage = "url(./images/ogretmenkemal.jpg)";
    movieTheater(5);
  } else if (optionID === "movieTheater4") {
    screen.style.backgroundImage = "url(./images/red.jpg)";
    movieTheater(8);
  }
}

// New seats render
function movieTheater(SeatNumber = 6) {
  removeSeats();
  createNewSeats(SeatNumber);

  let newSeats = document.querySelectorAll(".row .seat");
  newSeats.forEach((e, index) => {
    e.innerText = index + 1;
  });
}

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) e.target.classList.toggle("selected");

  updateSelectedButton();
  updateSelectedCount();
});

// Button display
function updateSelectedButton() {
  const seats = document.querySelectorAll(".row .seat");
  let seatsArr = Array.from(seats);
  activeSeats = seatsArr.filter((x) => x.classList.contains("selected"));
  if (activeSeats.length > 0) {
    buttons.classList.remove("displayNone");
  } else {
    buttons.classList.add("displayNone");
  }
}

// Buy button
document.querySelector(".buy").addEventListener("click", () => {
  let selecteds = document.querySelectorAll(".row .seat.selected");

  selecteds.forEach((x) => x.classList.replace("selected", "occupied"));

  addSeatStorage();
  resetData();
});

//Cancel Button
document.querySelector(".cancel").addEventListener("click", () => {
  let selectedRemove = document.querySelectorAll(".row .seat.selected");
  selectedRemove.forEach((x) => x.classList.remove("selected"));
  resetData();
});

//ticket price
let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//remove seats
function removeSeats() {
  const deleteRow = document.querySelectorAll(".row");
  deleteRow.forEach((row) => {
    row.remove();
  });
}
//create seats
function createNewSeats(SeatNumber) {
  for (let i = 0; i < SeatNumber; i++) {
    const forRow = document.createElement("div");
    forRow.className = "row";
    container.appendChild(forRow);
    for (let j = 0; j < 8; j++) {
      const forSeats = document.createElement("div");
      forSeats.className = "seat";
      forRow.appendChild(forSeats);
    }
  }
  getFromSessionStorage();
}

// Printing to sessionstorage
function addSeatStorage() {
  const occupiedSeats = document.querySelectorAll(".row .seat.occupied");
  const allSeats = document.querySelectorAll(".row .seat");

  const occupiedSeatsArray = [];
  const seatsArray = [];

  occupiedSeats.forEach(function (seat) {
    occupiedSeatsArray.push(seat);
  });

  allSeats.forEach(function (seat) {
    seatsArray.push(seat);
  });

  let occupiedSeatIndexs = occupiedSeatsArray.map(function (seat) {
    return seatsArray.indexOf(seat);
  });

  saveToSessionStorage(occupiedSeatIndexs);
}

function saveToSessionStorage(indexs) {
  sessionStorage.setItem(movieSelect.options[movieSelect.selectedIndex].id, JSON.stringify(indexs));
}

function getFromSessionStorage() {
  let movieTheaters = movieSelect.options[movieSelect.selectedIndex].id;
  const occupiedSeats = JSON.parse(sessionStorage.getItem(movieTheaters));
  let allSeats = document.querySelectorAll(".row .seat:not(.occupied)");

  if (occupiedSeats != null && occupiedSeats.length > 0) {
    allSeats.forEach(function (seat, index) {
      if (occupiedSeats.indexOf(index) > -1) {
        seat.classList.add("occupied");
      }
    });
  }
}

function resetData() {
  buttons.classList.add("displayNone");
  count.innerText = "0";
  total.innerText = "0";
}
