// autocomplete.js
let searchMarker = null;

function initAutocomplete() {
    const addressInput = document.getElementById("addressInput");
    const autocomplete = new google.maps.places.Autocomplete(addressInput);

    //when user selects a place from the autocomplete
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
            window.map.setCenter(place.geometry.location);
            window.map.setZoom(17);

            //create or move pin
            if (!searchMarker) {
                searchMarker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: window.map,
                });
            } else {
                searchMarker.setPosition(place.geometry.location);
            }
        }
    });
}