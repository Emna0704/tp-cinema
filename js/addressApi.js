
const baseUrl = 'https://api-adresse.data.gouv.fr';
const url="https://api-adresse.data.gouv.fr"
export function getAddressFromCoords(coords) {
    return fetch(`${baseUrl}/reverse/?lon=${coords.longitude}&lat=${coords.latitude}`)
        .then(response => response.json())
        .then(response => response.features[0].properties.label);
}

export function getCoordsFromAddress(address) {
    const apiUrl = `${baseUrl}/search/?q=${encodeURIComponent(address)}&limit=1`;
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des coordonnées.");
            }
            return response.json(); 
        })
        .then(data => {
            console.log("Données de l'API :", data); 
            if (!data.features || data.features.length === 0) {
                throw new Error("Coordonnées non trouvées pour cette adresse.");
            }
            const [longitude, latitude] = data.features[0].geometry.coordinates;
            console.log("Longitude et Latitude :", longitude, latitude);
            return { longitude, latitude }; 
        })
        .catch(error => {
            console.error("Erreur détectée :", error);
            throw error;
        });
}
