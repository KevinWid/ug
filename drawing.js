// drawing.js
function initDrawingManager() {
    // access the global map
    const map = window.map;

    window.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ["polygon"],
        },
        polygonOptions: {
            fillColor: "#FF0000",
            fillOpacity: 0.3,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            zIndex: 1,
        },
    });

    // attach to map
    window.drawingManager.setMap(map);

    // listen for new polygons
    google.maps.event.addListener(window.drawingManager, "overlaycomplete", (event) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
            const newPolygon = event.overlay;
            window.polygons.push(newPolygon);

            //listen for changes in the polygon path
            const path = newPolygon.getPath();
            google.maps.event.addListener(path, "set_at", recalcAllPolygons);
            google.maps.event.addListener(path, "insert_at", recalcAllPolygons);
            google.maps.event.addListener(path, "remove_at", recalcAllPolygons);

            //after new polygon added, recalc total
            recalcAllPolygons();
        }
    });
}