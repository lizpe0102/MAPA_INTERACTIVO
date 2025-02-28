var map = L.map('map').setView([4.743327, -74.108266], 19);

// Agregar capa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Coordenadas del polígono de La Gaitana
var polygonCoords = [
    [4.745353, -74.107976],
    [4.744688, -74.106584],
    [4.738398, -74.105616],
    [4.738473, -74.108158],
    [4.742130, -74.107836],
    [4.742878, -74.109328],
    [4.741606, -74.111130],
    [4.742632, -74.111871],
    [4.745294, -74.108255]
];

// Crear el polígono
var polygon = L.polygon(polygonCoords, {
    color: 'blue', // Color del borde
    fillColor: 'blue', // Color de relleno
    fillOpacity: 0.3 // Opacidad del relleno
}).addTo(map);

// Agregar popup al hacer clic en el polígono
polygon.bindPopup("Zona delimitada");
function mostrarPoligono() {
    map.addLayer(polygon);
}

// Función para ocultar el polígono
function ocultarPoligono() {
    map.removeLayer(polygon);
}

// Función para centrar el mapa
function centrarMapa() {
    map.setView([4.745353, -74.107976], 19);
}