window.onload = init;

function init() {

    // For creation of the map
    let map = L.map('map').setView([46.8, 3], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // For create marker on the map
    fetch('./promo.json')
        .then(response => response.json())
        .then(data => displayDataForCard(data))

    function displayDataForCard(data) {
        const studentData = data.promo[0].apprenants

        for (let i = 0; i < studentData.length; i++) {
            let marker = L.marker([studentData[i].coordonnees.latitude, studentData[i].coordonnees.longitude])
                .bindPopup("<b>" + studentData[i].prenom + " " + studentData[i].nom + "</b><br>Lieu : " + studentData[i].ville)
                .addTo(map);

            marker._icon.classList.add('markersColor');
        }
    }

    // For take lat & lng with simple click on the map
    let markerPopup = L.marker();

    function onMapClick(e) {
        console.log(e.latlng)
        markerPopup
            .setLatLng(e.latlng)
            .bindPopup("<b>Coordonnées du point :</b><br>" + "Latitude : " + e.latlng.lat + "<br> Longitude : " + e.latlng.lng)
            .addTo(map);
        markerPopup._icon.classList.add('pointerPinColor');
    }

    map.on('click', onMapClick);

}