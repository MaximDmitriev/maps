"use strict";

function createGoogleRoute(elem, map) {
    map = new google.maps.Map(elem, {
      center: {lat: 55.76, lng: 37.64},
      zoom: 10
    });

    let directionsService= new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer({map: map}); 
    let arr = [];
    arr.push(directionsService);
    arr.push(directionsDisplay);
    return arr;       
}


function renderRoute(directionsService, directionsDisplay) {
           
  directionsService.route({
    origin: "краснобогатырская, 12",
    destination: "ивантеевская, 12",
    travelMode: 'WALKING'
  }, (response, status) => {

    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      alert('Directions request failed due to ' + status);
    }
  });
}

export {createGoogleRoute, renderRoute};