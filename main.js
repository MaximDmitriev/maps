"use strict";

import Point from "./parts/pointClass";
import {createYandexRoute, updateYandexRoute, changeOrderYandexRoute} from "./parts/mapsy";
import {createGoogleRoute, renderRoute} from "./parts/mapsg";

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
        yMode = false,
        gMode = false;

    let ready = false;
    let route;
    let map;
    let displayAndService;

    yandexBtn.addEventListener('click', () => {
        googleLogo.style.display = "none";
        yandexLogo.style.display = "block";
        yandexLogo.style.opacity = 1;
        startScreen.style.display = "none";
        imgChoise.setAttribute("src", "./img/yandexMaps.png");
        secondScreen.style.display = "block";
        gMode = false;
        // вставить промис
        ymaps.ready(function(){
            ready = true;
            yMode = true;
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
        secondScreen.style.display = "none"; //
        arrow.style.top = 0;
        arrow.querySelector("img").style.transform = "rotateZ(0)";
        yMode = false;
        gMode = true;
        mapWindow.innerHTML = "";
    });

    let wrapper = document.querySelector(".route-wrapper"),
        newPoint = document.querySelector(".point"),
        empty = false,
        nums = 0,
        pointList = [];
    
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

        yMode ? updateYandexRoute(route, pointList) : renderRoute(pointList, ...displayAndService);
    }

    function checkInput() {                         //проверка на незаполненный инпут
        const element = document.getElementsByClassName("route-item");

        if(element[0] != undefined) {
            const input = element[element.length - 1].querySelector("input");
            if(input.value == "") {
                return true;
            }
        }
        return false;
    }

    function updateAdrs(adresses) {                 //правильные адреса в инпутах, берем их из яндекс апи
        let inputs = document.querySelectorAll("input");

        pointList.forEach((item, i) => {            //удаление клонов при редактировании или удалении точек
            item.adress = adresses[i];
            if(i > 0 && (i + 1) < adresses.length && (adresses[i] === adresses[i + 1] || adresses[0] === adresses[adresses.length - 1])) {
                adresses.splice(i, 1);
            }
            if(i > 0 && (i + 1) < pointList.length && pointList[i].id >= pointList[i + 1].id) {
                pointList.splice(i + 1, 1);
            }
        });

        inputs.forEach((item, i) => {               //замена пользовательского ввода на нормальные адреса
            if(item.value !=="") {
                item.value = pointList[i].adress;
            }
        });
    }
    
    stylingWrapper(nums);

    let startHeight,
        targetItem;

   
    newPoint.addEventListener('click', () => {
        
        empty = checkInput();
        
        if (!empty && (yMode || gMode)) { 
            let div = new Point(nums);  
            div.addPoint(wrapper);
            div.point.querySelector("input").addEventListener('change', () => {         //ввод адреса
                div.getAdress();

                if (pointList.length == 0) {                                            //если маршрута еще не было 

                    if (mapWindow.innerHTML != "" && route === undefined) mapWindow.innerHTML = "";
                    yMode ? route = createYandexRoute(div.adress, map, route) : displayAndService = createGoogleRoute(mapWindow, map);
                    pointList.push(div);
                   
                } else {                                                                //если это уже не первая точка
                    const index = pointList.findIndex((item) => item.id == div.id);     //смотрим новая это точка или редактирование старой
                    if (index == -1) {
                        pointList.push(div);
                    } else {
                        pointList[index].getAdress();
                    }                                               
                    yMode ? updateYandexRoute(route, pointList)
                            .then((res) => updateAdrs(res)) : renderRoute(pointList, ...displayAndService);
                }
            });
    
            let deleteBtn = div.point.querySelector(".close");
    
            deleteBtn.addEventListener('click', (event) => {                    //удаление точки
                    if(confirm("Удалить точку?")) removeInput(event.target, div);
                });
    
            nums++;
            stylingWrapper(nums);

            div.point.addEventListener('mousedown', (event) => {                //перемещение инпута
                
                if (!event.target.classList.contains("close") &&
                !event.target.classList.contains("input") && nums > 1 &&
                div.point.querySelector("input").value !=="") {                 //убедились, что это не ввод и не удадение
                    
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
    
                div.point.addEventListener('mouseup', (event) => {              //конец перетаскивания, перерисовка инпутов и перестроение маршрутов

                    empty = checkInput();

                    if (empty && div.dragable) {                                // если есть пустой инпут, то удалить его
                        const element = document.getElementsByClassName("route-item");
                        element[element.length - 1].remove();
                        nums--;
                        stylingWrapper(nums);
                    }
    
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

                            yMode ? changeOrderYandexRoute(route, pointList) : renderRoute(pointList, ...displayAndService);
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
    
                            yMode ? changeOrderYandexRoute(route, pointList) : renderRoute(pointList, ...displayAndService);
                        }
                    }
                });
            });
        } else {
            alert("Выберете систему или введите адрес в поле ввода");
        }
    });
});



/* баги :

    1. если номера дома не существует, то берется дом по умолчанию, если при втором вводе одной и той же улицы
       дом опять не существует, то в массиве пути одинаковые объекты и яндекс не может выставить масштаб

*/