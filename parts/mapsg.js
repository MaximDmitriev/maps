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


function renderRoute(list, directionsService, directionsDisplay) {
           
  let start = list[0].adress,
      stop = list[list.length - 1].adress,
      routeList = [];

  if (list.length > 2) {
    for (let i = 1; i < list.length - 1; i++) {
      routeList.push({
        location: list[i].adress,
        stopover: true
      });
    }
  }

  directionsService.route({
      origin: start,
      destination: stop,
      waypoints: routeList,
      travelMode: 'DRIVING'
    }, (response, status) => {

    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      alert('Directions request failed due to ' + status);
    }
  });
}

export {createGoogleRoute, renderRoute};