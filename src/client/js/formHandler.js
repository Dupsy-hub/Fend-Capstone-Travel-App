async function handleSubmit(event) {
  // Event Listener to add function to HTML element
  event.preventDefault();
  const date = document.getElementById("departure").value;
  const location = document.getElementById("location").value;
  console.log(date);
  console.log(location);
  // Convert to milisecond
  const departureDate = new Date(date).getTime();
  const day = 1000 * 60 * 60 * 24;

  //   // Implement countdown logic
  const countDownFn = () => {
    //Get today,s date and time
    let today = new Date().getTime();
    // Find the differece between today and countdown date
    let timeSpan = departureDate - today;

    if (timeSpan < 0) {
      console.log("Unfortunately we have past the travel day");
      return;
    } else {
      // Time calculations for days left
      const days = Math.ceil(timeSpan / day);
      console.log(days);
    }
  };
  countDownFn();

  //   // Get geoCoordinates from geonames
  let lat, long;
  try {
    console.log("day");
    const g = await fetch("http://localhost:8000/getLocation", {
      method: "POST",
      body: JSON.stringify({ location: location }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(day);
    const loc = await g.json();
    lat = loc.lat;
    long = loc.long;
    console.log(loc);
  } catch (error) {
    console.log(error);
  }

  /* Get weatherdata for location */
  const weatherbitForecast = async () => {};
  try {
    console.log(long);
    const res = await fetch("http://localhost:8000/getWeather", {
      method: "POST",
      body: JSON.stringify({ lat: lat, lon: long }),
      headers: {
        "Content-Type": "application/JSON",
      },
    });
    const data = await res.json();
    console.log(data);
    document.getElementById("date").innerHTML = new Date(
      departureDate
    ).toDateString();
    document.getElementById("location").innerHTML = location;
    document.getElementById(
      "temp_high"
    ).innerHTML = `Temp high: ${data.data[0].high_temp}`;
    document.getElementById(
      "temp_low"
    ).innerHTML = `Temp low: ${data.data[0].low_temp}`;
  } catch (error) {
    console.log(error);
  }

  /* Get Image from pixabay */
  try {
    const response = await fetch("http://localhost:8000/getImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city: location,
      }),
    });
    const data = await response.json();
    if (data.totalHits > 0) {
      const imgURL = data.hits[0].webformatURL;
      document.getElementById("dest_pic").src = imgURL;
      document.getElementById("dest_pic").style.width = "30";
      document.getElementById("dest_pic").style.height = "30";
    }
  } catch (error) {
    console.log(error);
  }
}
export { handleSubmit };
