// Function to show the map with a marker
async function showLocationOnMap() {
    const locationElement = document.getElementById("listing-location");
    if (!locationElement) {
        console.error("Location element not found.");
        return;
    }
    
    const place = locationElement.innerText.trim();
    if (!place) {
        console.error("Location is empty.");
        return;
    }
    
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
    
        if (data.length > 0) {
            const { lat, lon } = data[0];
    
            // Initialize Map
            const map = new maplibregl.Map({
                container: 'map',
                style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
                center: [lon, lat],
                zoom: 12
            });
    
            // Add marker
            new maplibregl.Marker()
                .setLngLat([lon, lat])
                .setPopup(new maplibregl.Popup().setHTML(`<h3>${place}</h3>`)) // Show location name
                .addTo(map);
        } else {
            console.error("Location not found");
            document.getElementById("map").innerHTML = "<p>Location not found</p>";
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        document.getElementById("map").innerHTML = "<p>Error loading map</p>";
    }
}

// Wait for MapLibre to load before initializing the map
function waitForMapLibre(callback) {
    if (typeof maplibregl !== "undefined") {
        callback();
    } else {
        console.log("MapLibre GL JS is not loaded. Retrying in 1 second...");
        setTimeout(() => waitForMapLibre(callback), 1000);
    }
}

waitForMapLibre(() => {
    console.log("MapLibre GL JS Loaded Successfully!");
    const place = document.getElementById("listing-location").innerText.trim();
    console.log(place);
    showLocationOnMap(place);
});



