// map.js
// Global references for map and polygons
window.map = null;
window.drawingManager = null;
window.polygons = [];

// Called after the entire window loads
function initMap() {
  // Initialize the map
  window.map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.3059, lng: -89.5181 }, // Center on Cape Girardeau
    zoom: 13,
    mapTypeId: "hybrid", // show satellite + labels
  });

  initDrawingManager();
  initAutocomplete();
}

// Attach initMap to the window's onload event so it's called after page load
window.onload = initMap;
