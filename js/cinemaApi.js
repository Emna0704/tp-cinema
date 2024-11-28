export function getCinemasNear(coords, maxDistance) {
   
    const apiUrl = `https://data.culture.gouv.fr/api/records/1.0/search/?dataset=etablissements-cinematographiques&q=&geofilter.distance=${coords.latitude},${coords.longitude},${maxDistance * 1000}&rows=100`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des cinémas.");
            }
            return response.json();
        })
        .then(data => {
            if (!data.records || data.records.length === 0) {
                throw new Error("Aucun cinéma trouvé.");
            }
           
            return data.records.map(record => {
              
                const cinema = record.fields;
                return {
                    name: cinema.nom,
                    address: cinema.adresse,
                    distance: calculateDistance(
                        coords.latitude,
                        coords.longitude,
                        cinema.latitude,
                        cinema.longitude
                    )
                };
            });
        });
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);  
    const dLon = (lon2 - lon1) * (Math.PI / 180);  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance.toFixed(2); 
}

