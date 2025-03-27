// calculation.js
function recalcAllPolygons() {
    const costPerSqFootInput = document.getElementById("costPerSqFoot");
    const errorMessage = document.getElementById("errorMessage");

    //validate cost input
    let costPerSqFoot = parseFloat(costPerSqFootInput.value);
    if (isNaN(costPerSqFoot) || costPerSqFoot <= 0) {
        //show error and set cost to 0
        errorMessage.style.display = "block";
        costPerSqFoot = 0;
    } else {
        errorMessage.style.display = "none";
    }

    //calc total area
    let totalArea = 0;
    for (let i = 0; i < window.polygons.length; i++) {
        const poly = window.polygons[i];
        const areaSqFt = computePolygonAreaSqFt(poly);
        totalArea += areaSqFt;
    }

    //update table for each polygon
    updatePolygonTable();

    // calculate total cost
    const totalCost = totalArea * costPerSqFoot;

    //update UI
    document.getElementById("totalArea").textContent = "Total Area: " + totalArea.toFixed(2) + " sq ft";
    document.getElementById("totalCost").textContent = "Total Cost: $" + totalCost.toFixed(2) + " sq ft";
}

function computePolygonAreaSqFt(polygon) {
    //grab the polygon path
    const path = polygon.getPath();
    const coords = [];
    for (let i = 0; i < path.getLength(); i++) {
        coords.push(path.getAt(i));
    }

    //compute area in sq meters then convert to sq ft
    const areaSqMeters = google.maps.geometry.spherical.computeArea(coords);
    return areaSqMeters * 10.7639;
}