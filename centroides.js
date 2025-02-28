function calculateDistanceCentroids(){
    if (drawnLayers && drawnLayers.length > 0) { //verificar que hayan más de dos geometrias
        let centroides = [];

        drawnLayers.forEach((layer, index) => {
            // Convierte la capa de Leaflet a GeoJSON
            let geojson = layer.toGeoJSON();

            if (geojson.geometry && geojson.geometry.type === "Polygon") {
                let centroide = turf.centroid(geojson);
                centroides.push(centroide);
            } else {
                console.warn(`El objeto ${index + 1} no es un polígono válido.`);
            }
        });

        // Si hay al menos dos centroides, calcular distancias siguiendo la lógica dada en clase
        if (centroides.length > 1) {
            for (let i = 0; i < centroides.length; i++) {
                let centroide1 = centroides[i];
                let centroide2 = (i === centroides.length - 1) ? centroides[0] : centroides[i + 1]; // El último con el primero
        
                // Revisa las coordenadas antes de calcular la distancia
                //console.log('Centroide 1:', centroide1.geometry.coordinates);
                //console.log('Centroide 2:', centroide2.geometry.coordinates);
        
                // Calcula la distancia sin usar reverse en las coordenadas
                let distancia = turf.distance(centroide1.geometry.coordinates, centroide2.geometry.coordinates, { units: 'kilometers' });
        
                console.log(`Distancia entre el centroide ${i + 1} y el centroide ${(i === centroides.length - 1) ? 1 : i + 2}: ${distancia.toFixed(2)} km`);
        
                // Agregar marcadores en el mapa de cada centroide
                L.marker(centroide1.geometry.coordinates) // sin reverse aquí
                  .bindPopup(`Centroide ${i + 1}`)
                  .addTo(map);
        
                L.marker(centroide2.geometry.coordinates) // sin reverse aquí
                  .bindPopup(`Centroide ${(i === centroides.length - 1) ? 1 : i + 2}`)
                  .addTo(map);
            }
        } else {
            console.warn("No hay suficientes centroides para calcular distancias.");
        }        
    } else {
        console.warn("No se encontraron objetos en drawLayers.");
    }