
    // Event Listener to add function to HTML element
    document.getElementById('submit').addEventListener('click', performAction);

    /* Function called by event listener */
    function performAction(event) {
        event.preventDefault();
        const date = document.getElementById('departure').value;
        const location = document.getElementById('location').value;

        // countdown function to travel date
       // https://stackabuse.com/how-to-build-a-date-countdown-with-vanilla-javascript/
       
       
       let interval;

       // Convert to milisecond
       const second = 1000;
       const minute = second * 60;
       const hour = minute * 60;
       const day = hour * 24;

       
       const departureDate = new Date ();
       //Setting travel date a week from current date 
       departureDate = new Date(departureDate.getTime() + 7 * day);
       
       // Implement countdown logic
       const countDownFn = () => {

            //Get today,s date and time
            let today =new Date().getTime();
            // Find the differece between today and countdown date
            let timeSpan = (departureDate - today);
            
            if (timeSpan <= -today) {
                console.log("Unfortunately we have past the travel day");
                clearInterval(interval);
                return;
            } else if (timeSpan <= 0) {
                console.log("Today is the travel date");
                clearInterval(interval);
              }  else {
                // Time calculations for days left
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));



              }     
        
        }
    
    interval = setInterval(countDownFn, day);        


    // Get geoCoordinates from geonames 
    const geonamesCoordinates = (async() => {
        await fetch("http://localhost:8000/geonames", {
        method: 'POST',
        body: JSON.stringify({ city:location }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    })
    
    try{ 
        const location = (async() => {
            await geonamesCoordinates.json();
        
                latitude= location.geonames[0].lat
                longitude= location.geonames[0].lng
        })
         
        }catch (error) {
            console.log("error", error);
        }
                
            /* Get weatherdata for location */
    const weatherbitForecast = (async() => {
        await fetch('http://localhost:8000/weatherbit', {
        method: 'POST',
        body: JSON.stringify({ lat: latitude, long: longitude }),
        headers: {
            'Content-Type': 'application/JSON'
        }
    })
     
    })
    try {
        const res = (async() => {
            await weatherbitForecast.json();
        })        
        
        } catch(error){
            console.log("error", error)
    }       

     
   /* Get Image from pixabay */
   const getImage = (async() => {
    await fetch('/getImage', { city: location})
    async function getImage() {
        try {
            const response = await fetch('http://localhost:8000/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destination: destination, country: country })
            });
            
        } catch (error) {
            console.log(error);
        }
    
    }   
   })        

  
    const postData = async (url = "", data = {}) => {
             console.log('Analyzing:', data);
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            try {
            const newData = await response.json();
            console.log(newData)
            return newData;
        } catch (error) {
            console.log('error', error);
        }
    };    


    // Function to Update UI
    const updateUI = async()=>{    
        try {
            const request = await fetch('/all'); 
        
            const updatedData = await request.json();
        
            //update elements with the received data
            document.getElementById("date").innerHTML = updatedData.date(`Your trip is ${timeSpan} day(s) away.`);
            document.getElementById("title").innerHTML = updatedData.title('Typical weather for then is');
            document.getElementById("temp_high").innerHTML =updatedData.temp_high(`High Temperature: ${data.highTemp}`);
            document.getElementById("temp_low").innerHTML = updatedData.temp_low(`Low Temperature: ${data}. lowTemp}`);
            document.getElementById("dest_pic").innerHTML = updatedData.dest_pic(`<img src=${data.getImageUrl}>`);

        
            }catch (error) {
            console.log("error", error);
        }
       
    }

};
    
    export { handleSubmit }