"use strict";

document.addEventListener('DOMContentLoaded', () => {


    let yandexBtn = document.querySelector(".yandex"),
        googleBtn = document.querySelector(".google"),
        yandexLogo = document.querySelector(".yMap"),
        googleLogo = document.querySelector(".gMap"),
        mapWindow = document.querySelector("#map"),
        startScreen = document.querySelector(".start"),
        secondScreen = document.querySelector(".second"),
        arrow = document.querySelector(".arrow"),
        imgChoise = secondScreen.querySelector("img"),
        yandex = false,
        google = false;

    
    let ready = false;
    let route;
 
    yandexBtn.addEventListener('click', () => {
        googleLogo.style.display = "none";
        yandexLogo.style.display = "block";
        yandexLogo.style.opacity = 1;
        startScreen.style.display = "none";
        imgChoise.setAttribute("src", "./img/yandexMaps.png");
        secondScreen.style.display = "block";
        google = false;
        // вставить промис
        ymaps.ready(function(){
            ready = true;
            yandex = true;
            startScreen.style.display = "none";
            imgChoise.setAttribute("src", "./img/yandexMaps.png");
            secondScreen.style.display = "block";
            arrow.style.top = 0;
            arrow.querySelector("img").style.transform = "rotateZ(0)";
            return ready;
        });
    });

    googleBtn.addEventListener('click', () => {
        yandexLogo.style.display = "none";
        googleLogo.style.display = "block";
        googleLogo.style.opacity = 1;
        startScreen.style.display = "none";
        imgChoise.setAttribute("src", "./img/googleMaps.png");
        secondScreen.style.display = "block";
        arrow.style.top = 0;
        arrow.querySelector("img").style.transform = "rotateZ(0)";
        yandex = false;
        google = true;
    });

    function createYandexRoute(adress){
        let map = new ymaps.Map("map", {
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
    }

    function updateYandexRoute(newRoute, list){
        let routeList = [];

        for (let item of list) {
            routeList.push(item.adress);
        }
        newRoute.model.setReferencePoints(routeList);
    }


    let wrapper = document.querySelector(".route-wrapper"),
        newPoint = document.querySelector(".point"),
        nums = 0,
        pointList = [];

    class Point {
        constructor(id){
            this.id = id;
            this.adress = "";
            this.dragable = false;
            this.point = document.createElement("div");
            this.content = '<input type="text" class="input">\
                            <button class="close">&times;</button>';
        }

        addPoint(){
            this.point.classList.add("route-item");
            this.point.innerHTML = this.content;
            this.point.style.top = 7 + 57 * (this.id) + "px";
            this.point.setAttribute("id", `${this.id}`);

            wrapper.appendChild(this.point);

            this.point.style.opacity = 0;
            setTimeout(() => this.point.style.opacity = 1, 400);
        }

        removePoint(){
            this.point.remove();
        }

        getAdress(){
            this.adress = this.point.querySelector("input").value;
        }
    }
    
    function stylingWrapper(n) {                    //изменение обертки и положения кнопки.
        newPoint.style.top = 57 * n + 10 + "px";
        wrapper.style.height =  57 * n + 60 + "px";
    }

    function removeInput(element, input) {
        for(let i in pointList) {
            if(pointList[i].id == element.parentElement.getAttribute("id")){
                pointList.splice(i, 1);

                for(let j = i; j < pointList.length; j++) {
                    pointList[j].id = j;
                    pointList[j].point.setAttribute("id", `${j}`);
                    pointList[j].point.style.top = 7 + 57 * j + "px"; // перемещаем все инпуты, ниже удаленного на одну позицию вверх
                }
            }
        }
        input.removePoint();
        nums--;
        stylingWrapper(nums);

        updateYandexRoute(route, pointList);  //yandex
    }

    stylingWrapper(nums);

    let startHeight,
        targetItem;
   
    newPoint.addEventListener('click', () => {
        
        if (yandex || google) {
            let div = new Point(nums);
            div.addPoint();
            div.point.querySelector("input").addEventListener('change', () => {
                div.getAdress();
                if (pointList.length == 1 && route === undefined){
                    if (mapWindow.innerHTML != "" && route === undefined) mapWindow.innerHTML = "";
                    createYandexRoute(div.adress);
                } else {
                    updateYandexRoute(route, pointList);
                }
            });
            pointList.push(div);
    
    
            let deleteBtn = div.point.querySelector(".close");
    
            deleteBtn.addEventListener('click', (event) => {  
                    if(confirm("Удалить точку?")) removeInput(event.target, div);
                });
    
            nums++;
            stylingWrapper(nums);
    
    
    
    
            div.point.addEventListener('mousedown', (event) => {
                
                if (!event.target.classList.contains("close") &&
                !event.target.classList.contains("input") && nums > 1) {
                    
                    startHeight = parseInt(event.target.style.top.slice(0,-2));
                    targetItem = parseInt(event.target.id);
    
                    div.dragable = true;
    
                    div.point.style.zIndex = 1000;
                    div.point.classList.add("move");
                } 
    
                div.point.addEventListener('mousemove', (event) => {
                    event.preventDefault();
                    if(div.dragable){
                        div.point.style.top = event.pageY - wrapper.offsetTop - 15 + 'px';
                    }
    
                });
    
                div.point.addEventListener('mouseup', (event) => {
    
                    if(div.dragable){
    
                        div.dragable = false;
                        event.target.style.zIndex = 800;
                        div.point.classList.remove("move");
    
                        div.point.onmousemove = null;
                        div.point.onmouseup = null;
    
                        let h = parseInt(div.point.style.top.slice(0,-2)); 
                        h < 0 ? div.point.style.top = "7px" : div.point.style.top = h - h%57 + 7 + "px";
                        
                        let diff = ((h - h%57 + 7 - startHeight) / 57) | 0; // насколько элементов сдвинулись
                        // if(diff == 0) {
    
                        // }
                        
                        let temp = pointList[targetItem];
                        
                        if(diff > 0) {
                            for(let j = targetItem; j < (targetItem + diff); j++){
                                
                                pointList[j] = pointList[j + 1];
                                pointList[j].id = j;
                                pointList[j].point.setAttribute("id", `${j}`);
                                pointList[j].point.style.top = 7 + 57 * j + "px";
                            }
                            pointList[targetItem + diff] = temp;
                            pointList[targetItem + diff].id = targetItem + diff;
                            pointList[targetItem + diff].point.setAttribute("id", `${targetItem + diff}`);
                            pointList[targetItem + diff].point.style.top = 7 + 57 * (targetItem + diff) + "px";
    
                            updateYandexRoute(route, pointList);
                        }
    
                        if(diff < 0) {
                            for(let j = targetItem; j > targetItem + diff; j--){ 
                                pointList[j] = pointList[j - 1];
                                pointList[j].id = j;
                                pointList[j].point.setAttribute("id", `${j}`);
                                pointList[j].point.style.top = 7 + 57 * j + "px";
                            }
                            pointList[targetItem + diff] = temp;
                            pointList[targetItem + diff].id = targetItem + diff;
                            pointList[targetItem + diff].point.setAttribute("id", `${targetItem + diff}`);
                            pointList[targetItem + diff].point.style.top = 7 + 57 * (targetItem + diff) + "px";
    
                            updateYandexRoute(route, pointList);
                        }
                    }
                });
            });
        } else {
            alert("Выберете систему");
        }


    });

});




