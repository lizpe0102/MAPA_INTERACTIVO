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
btnTrees.addEventListener('click', ()=> alert('Hola'));
