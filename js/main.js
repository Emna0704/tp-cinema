import { getCoords } from "./geolocation.js";
import { getAddressFromCoords, getCoordsFromAddress } from "./addressApi.js";
import { getCinemasNear } from "./cinemaApi.js";

    const geolocateBtn = document.getElementById("geolocate-btn");
    const cinemaForm = document.getElementById('cinema-form');
    const cinemaList = document.getElementById('cinema-list');
    const addressInput = document.getElementById('address-input');
    const distanceInput = document.getElementById('distance');
    const distanceValue = document.getElementById('distance-value'); 
   



    geolocateBtn.addEventListener('click', () => {
        getCoords().then(coords => getAddressFromCoords(coords)).then(address => {
            
            addressInput.textContent = address;
            addressInput.value = address;
            console.log(addressInput)
        });
    });

    
cinemaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const address = addressInput.value; 
    const maxDistance = distanceInput.value; 

    if (!address) {
        alert("Veuillez saisir une adresse ou utiliser la géolocalisation.");
        return;
    }

    cinemaList.innerHTML = "<li>Chargement...</li>"; 

    
    getCoordsFromAddress(address)
        .then(coords => {
            return getCinemasNear(coords, maxDistance);
        })
        .then(cinemas => {
            cinemaList.innerHTML = ""; 
            if (cinemas.length === 0) {
                cinemaList.innerHTML = "<li>Aucun cinéma trouvé à proximité.</li>";
                return;
            }
            cinemas.forEach(cinema => {
                const li = document.createElement("li");
                li.textContent = `${cinema.name} - ${cinema.distance} km`;
                cinemaList.appendChild(li);
            });
            cinemas.sort((a, b) => a.distance - b.distance);
        })
        
});

distanceInput.addEventListener('input', () => {
    const distance = distanceInput.value;
    distanceValue.textContent = `${distance} km`;
});

   