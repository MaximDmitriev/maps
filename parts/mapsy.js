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

function updateYandexRoute(newRoute, list){
    let routeList = [];
    
    for (let item of list) {
        routeList.push(item.adress);
    }
    newRoute.model.setReferencePoints(routeList);
}

export {createYandexRoute, updateYandexRoute};