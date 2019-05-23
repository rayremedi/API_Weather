// var searchBar = new google.maps.places.SearchBox(document.querySelector('#search-bar'));
// searchBar.addEventListener('places_changed', function () {
//     var locale = searchBar.getPlaces()[0];
//     long.value = place.geometry.location.lng();
//     lat.value = place.geometry.location.lat();

// });



window.addEventListener("load", () => {

    // variable let longitude
    let long;
    //variable let latitude
    let lat;
    // variable let lié par le query selector de par sa classe
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    //Condition par la geolocalisation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //Variable constante qui permet à l'API de fonctionner
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            // API par la longitude et la latitude(géolocalisation)
            const api = `${proxy}https://api.darksky.net/forecast/057bc632dcac01b7a6537965aa08edb5/${lat},${long}`;
            //Fetch l'API
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //Envoi sous forme de donné les data temperature,summary,icon de l'API issu du parent currently dans la console browser 
                    const { temperature, summary, icon } = data.currently;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Formule de Celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //change temperature to celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C°";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;


                        }
                    })

                });
        });


    }
    // Fonction pour ajouter  les skycons à notre page HTML
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});


