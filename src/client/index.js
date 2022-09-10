import { handleSubmit } from "./js/formHandler";
import { urlChecker } from "./js/urlChecker";
import architecture from "./views/media/architecture-3363159_640.jpg";

import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/form.scss";

// document.getElementById("img").src = architecture;
document.getElementById(
  "left-box"
).style.backgroundImage = `url(${architecture})`;

// Getting html elements
const date = document.getElementById("date");
const location = document.getElementById("location");
const temp_high = document.getElementById("temp_high");
const temp_low = document.getElementById("temp_low");
const dest_pic = document.getElementById("dest_pic");
const obj = localStorage.getItem("1");
if (obj) {
  const data = JSON.parse(obj);
  date.innerHTML = data.date;
  location.innerHTML = data.location;
  temp_high.innerHTML = data.temp_high;
  temp_low.innerHTML = data.temp_low;
  dest_pic.src = data.dest_pic;
}

document.getElementById("saveButton").addEventListener("click", (e) => {
  // Creating an object with trip details
  const obj = {
    date: date.innerHTML,
    location: location.innerHTML,
    temp_high: temp_high.innerHTML,
    temp_low: temp_low.innerHTML,
    dest_pic: dest_pic.src,
  };
  // Saving a json string of object to local storage
  localStorage.setItem("1", JSON.stringify(obj));
});

document.getElementById("removeButton").addEventListener("click", (e) => {
  localStorage.removeItem("1");
  date.innerHTML = "";
  location.innerHTML = "";
  temp_high.innerHTML = "";
  temp_low.innerHTML = "";
  dest_pic.src = "";
  document.getElementById("location").value = "";
  document.getElementById("departure").value = "";
});

export { handleSubmit, urlChecker };
