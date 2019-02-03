"use strict";

function createYandexRoute(adress, map, route){
    map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl']
    }
    );

    route = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
            `${adress}`
        ],
        params:
        {   
            results: 1
        }},
        {
            boundsAutoApply: true
        }
    );
    
    map.geoObjects.add(route);
    route.events.add("change", () => {
        if(route.model.getReferencePoints().length > 1) map.setBounds(route.getBounds());
    });

    return route;
}

function updateYandexRoute(newRoute, list) {
    let routeList = [];
    
    for (let item of list) {
        routeList.push(item.adress);
    }

    function upd() {
   
        let promise = new Promise((resolve) => {
            
            newRoute.model.setReferencePoints(routeList);
            newRoute.model.events.once("update", () => {

                routeList = newRoute.model.properties._data.waypoints.map((item) => {
                    return item.name;
                });
                resolve(routeList);
        });
    });
    // promise.then((fullfield) => {return fullfield;});
    console.log(routeList);
    return promise;
    }
    let arr = upd();  // здесь проблема надо что-то типа async await
    return arr;

}

function changeOrderYandexRoute(newRoute, list){
    let routeList = [];
    
    for (let item of list) {
        routeList.push(item.adress);
    }
    newRoute.model.setReferencePoints(routeList);
}

export {createYandexRoute, updateYandexRoute, changeOrderYandexRoute};