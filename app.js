// Initialize the map and set its view to Kochi Beach coordinates
var map = L.map('map').setView([9.9637, 76.2375], 14);

// Set up the tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Layer 1: Safe swimming area (Green, innermost circle)
var greenZone = L.circle([9.9637, 76.2375], {
    color: 'green',
    fillColor: '#0f0',
    fillOpacity: 0.2,  // Lighter opacity for faint color
    radius: 100 // Smallest radius (green zone ends at 100 meters)
}).addTo(map).bindPopup('Green Zone: Safe for swimming');

// Layer 2: Safe boating area (Yellow, ring outside the green zone)
var yellowRing = L.circle([9.9637, 76.2375], {
    color: 'yellow',
    fillColor: 'none',  // No fill to create a ring
    weight: 20,         // Thicker border to create the ring effect
    opacity: 0.5,       // Lighter border color
    radius: 200         // Extends the border up to 200 meters
}).addTo(map).bindPopup('Yellow Zone: Moderately safe, safe for boating');

// Layer 3: Caution area (Orange, ring outside the yellow zone)
var orangeRing = L.circle([9.9637, 76.2375], {
    color: 'orange',
    fillColor: 'none',  // No fill to create a ring
    weight: 20,         // Thicker border to create the ring effect
    opacity: 0.5,       // Lighter border color
    radius: 300         // Extends the border up to 300 meters
}).addTo(map).bindPopup('Orange Zone: Exercise caution');

// Layer 4: Unsafe area (Red, ring outside the orange zone)
var redRing = L.circle([9.9637, 76.2375], {
    color: 'red',
    fillColor: 'none',  // No fill to create a ring
    weight: 20,         // Thicker border to create the ring effect
    opacity: 0.5,       // Lighter border color
    radius: 400         // Extends the border up to 400 meters
}).addTo(map).bindPopup('Red Zone: Unsafe for recreation activities');

// Geolocation: Show the user's current location
map.locate({setView: true, maxZoom: 16});

// Add a marker and circle for the user's location
function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius, {
        color: 'blue',
        fillOpacity: 0.1
    }).addTo(map);
}

map.on('locationfound', onLocationFound);

// Handle location errors
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);  