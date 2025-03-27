function updatePolygonTable() {
    const tableBody = document.getElementById("polygonTable").querySelector("tbody");
    tableBody.innerHTML = ""; //clear existing rows

    // go through each polygon
    for (let i = 0; i < window.polygons.length; i++) {
        const poly = window.polygons[i];
        const areaSqFt = computePolygonAreaSqFt(poly);
        
        //create new row
        const row = document.createElement("tr");

        //polygon index
        const indexCell = document.createElement("td");
        indexCell.textContent = i + 1;

        //area cell
        const areaCell = document.createElement("td");
        areaCell.textContent = areaSqFt.toFixed(2);

        //remove button
        const removeCell = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "remove";
        removeBtn.className = "remove-btn";
        removeBtn.addEventListener("click", () => removePolygon(i));
        removeCell.appendChild(removeBtn);

        row.appendChild(indexCell);
        row.appendChild(areaCell);
        row.appendChild(removeCell);

        //append row
        tableBody.appendChild(row);
    }
}

function removePolygon(polyIndex) {
    //remove from the map
    window.polygons[polyIndex].setMap(null);

    //remove from array
    window.polygons.splice(polyIndex, 1);

    //recalc total
    recalcAllPolygons();
}