var map = L.map('map').setView([4.743327, -74.108266], 19);

// Agregar capa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

async function loadPolygon(){
        let myData = await fetch('gaitana.geojson'); //toma un fragmento 
        let myPolygon = await myData.json();

        L.geoJSON(myPolygon,
            {
                style:{
                    color:'blue'
            }
            } 
        ).addTo(map);
        }

loadPolygon();
let btnTrees = document.getElementById("btnTrees");
btnTrees.addEventListener('click', 
    async ()=>{
        let response= await fetch("arboles_gaitana.geojson");
        let datos= (await response).json();
    //agregar la capa al mapa
        L.geoJSON(
            datos,
            {
                pointToLayer: (feature, latlong)=>{
                    return L.circleMarker(latlong,{
                        radius:5,
                        fillColor:'green',
                        weight:1,
                        opacity:1,
                        fillOpacity:0.5,

                    })
                }       //marcador de puntos en la capa
            }
        ).addTo(map);
    }
)

let btnDistances = document.getElementById("btnDistance");
btnDistances.addEventListener('click', async () => {
    let response = await fetch("arboles_gaitana.geojson");
    let datos = await response.json();

    let trees = datos.features.map((myElement, index) => ({
        id: index + 1,
        coordinates: myElement.geometry.coordinates
    }));

    console.log(trees);

    let Distances = [];
    trees.forEach((treeA) => {
        trees.forEach((treeB) => {
            let Distance = turf.distance(
                turf.point(treeA.coordinates),
                turf.point(treeB.coordinates)
            );
            Distances.push([
                `Árbol ${treeA.id}`,
                `Árbol ${treeB.id}`,
                Distance.toFixed(3)
            ]);
        });
    });

    generatePDF(Distances, trees.length);
});

function generatePDF(distances, totalTrees) {
    let { jsPDF } = window.jspdf;
    let documentPDF = new jsPDF();

    documentPDF.autoTable({
        head: [['Árbol 1', 'Árbol 2', 'Distance']],
        body: distances
    });

    documentPDF.save("La_Gaitana.pdf");
}