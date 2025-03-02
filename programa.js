var map = L.map('map').setView([4.743327, -74.108266], 19);

// Agregar capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

async function loadPolygon() {
    let myData = await fetch('gaitana.geojson');
    let myPolygon = await myData.json();

    L.geoJSON(myPolygon, {
        style: {
            color: 'blue'
        }
    }).addTo(map);
}
loadPolygon();

let btnTrees = document.getElementById("btnTrees");
btnTrees.addEventListener('click', async () => {
    let response = await fetch("arboles_gaitana.geojson");
    let datos = await response.json();

    L.geoJSON(datos, {
        pointToLayer: (feature, latlong) => {
            return L.circleMarker(latlong, {
                radius: 5,
                fillColor: 'green',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            });
        }
    }).addTo(map);
    console.log("Árboles cargados correctamente");
});

let btnDistances = document.getElementById("btnDistances");
btnDistances.addEventListener('click', async () => {
    let response = await fetch("arboles_gaitana.geojson");
    let datos = await response.json();

    let trees = datos.features.map((myElement, index) => ({
        id: index + 1,
        coordinates: [myElement.geometry.coordinates[1], myElement.geometry.coordinates[0]]
    }));

    console.log(trees);

    let Distances = [];
    trees.forEach((treeA, i) => {
        for (let j = i + 1; j < trees.length; j++) {
            let treeB = trees[j];
            let Distance = turf.distance(
                turf.point(treeA.coordinates),
                turf.point(treeB.coordinates)
            );
            Distances.push([
                `Árbol ${treeA.id}`,
                `Árbol ${treeB.id}`,
                Distance.toFixed(3)
            ]);
        }
    });

    generatePDF(Distances, trees.length);
});

function generatePDF(distances, totalTrees) {
    let { jsPDF } = window.jspdf;
    let documentPDF = new jsPDF();

    documentPDF.autoTable({
        head: [['Árbol 1', 'Árbol 2', 'Distancia (km)']],
        body: distances
    });

    documentPDF.save("La_Gaitana.pdf");
}

let btnIncidentes = document.getElementById("btnIncidentes");
btnIncidentes.addEventListener('click', 
    async function(){
        let response = await fetch("incidentes_gaitana (1).geojson");
        let datos = (await response.json());
        //Agregar la capa al mapa
        L.geoJSON(
            datos,
            {
                pointToLayer: (feature, latlong)=>{

                    return L.circleMarker(latlong, {
                        radius:3,
                        fillColor:'red',
                        weight:1,
                        opacity:0,
                        fillOpacity: 0.5,
                    })

                }
            }
        ).addTo(map);

    }
    
)
