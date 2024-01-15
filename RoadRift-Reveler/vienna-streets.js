mapboxgl.accessToken = "pk.eyJ1IjoicmlzaGlvamhhMTAxMCIsImEiOiJjbG8xaXRqcXgxanlxMm1teDV6ZGVxcm9xIn0.g3ojf3eaksqPOmxahGVsuQ";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // Preferred style
  center: [16.372480,48.211188],
  zoom: 15,
});

// Add the GeoJSON data as a source
map.on("load", function () {
  map.addSource("vienna-roads", {
    type: "geojson",
    data: "data/vienna-streets.geojson",
  });

  // Add a layer for the roads
  map.addLayer({
    id: "vienna-roads-line",
    type: "line",
    source: "vienna-roads",
    paint: {
      "line-color": "red",
      "line-width": 4,
    },
  });

  ////////////////////////////////////////////////////////////

  map.on("click", (e) => {
    console.log("click", e.point);

    const [selectedRoad] = map.queryRenderedFeatures(e.point, {
        layers: ["vienna-roads-line"],
    });

    if (selectedRoad) {
        // Create an HTML string to display road information
        let htmlContent = "<ul>";

        for (const property in selectedRoad.properties) {
            if (selectedRoad.properties.hasOwnProperty(property)) {
                htmlContent += `<li><strong>${property}:</strong> ${selectedRoad.properties[property]}</li>`;
            }
        }

        htmlContent += "</ul>";

        Swal.fire({
            title: `Road Details are:`,
            html: htmlContent,
            confirmButtonText: 'OK',
            icon: 'success'
        });
    }
});


  // Change the cursor to a pointer when the mouse is over the roads layer.
  map.on("mouseenter", "vienna-roads-line", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "vienna-roads-line", function () {
    map.getCanvas().style.cursor = "";
  });
  ////////////////////////////////////////////////////////////
});
