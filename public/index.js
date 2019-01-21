/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _parts_pointClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts/pointClass */ \"./parts/pointClass.js\");\n/* harmony import */ var _parts_mapsy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts/mapsy */ \"./parts/mapsy.js\");\n/* harmony import */ var _parts_mapsg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parts/mapsg */ \"./parts/mapsg.js\");\n\r\n\r\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\r\n\r\n    let yandexBtn = document.querySelector(\".yandex\"),\r\n        googleBtn = document.querySelector(\".google\"),\r\n        yandexLogo = document.querySelector(\".yMap\"),\r\n        googleLogo = document.querySelector(\".gMap\"),\r\n        mapWindow = document.querySelector(\"#map\"),\r\n        startScreen = document.querySelector(\".start\"),\r\n        secondScreen = document.querySelector(\".second\"),\r\n        arrow = document.querySelector(\".arrow\"),\r\n        imgChoise = secondScreen.querySelector(\"img\"),\r\n        yMode = false,\r\n        gMode = false;\r\n\r\n    \r\n    let ready = false;\r\n    let route;\r\n    let map;\r\n    let displayAndService;\r\n\r\n    yandexBtn.addEventListener('click', () => {\r\n        googleLogo.style.display = \"none\";\r\n        yandexLogo.style.display = \"block\";\r\n        yandexLogo.style.opacity = 1;\r\n        startScreen.style.display = \"none\";\r\n        imgChoise.setAttribute(\"src\", \"./img/yandexMaps.png\");\r\n        secondScreen.style.display = \"block\";\r\n        gMode = false;\r\n        // вставить промис\r\n        ymaps.ready(function(){\r\n            ready = true;\r\n            yMode = true;\r\n            startScreen.style.display = \"none\";\r\n            imgChoise.setAttribute(\"src\", \"./img/yandexMaps.png\");\r\n            secondScreen.style.display = \"block\";\r\n            arrow.style.top = 0;\r\n            arrow.querySelector(\"img\").style.transform = \"rotateZ(0)\";\r\n            return ready;\r\n        });\r\n    });\r\n\r\n    googleBtn.addEventListener('click', () => {\r\n        yandexLogo.style.display = \"none\";\r\n        googleLogo.style.display = \"block\";\r\n        googleLogo.style.opacity = 1;\r\n        startScreen.style.display = \"none\";\r\n        imgChoise.setAttribute(\"src\", \"./img/googleMaps.png\");\r\n        secondScreen.style.display = \"none\"; //\r\n        arrow.style.top = 0;\r\n        arrow.querySelector(\"img\").style.transform = \"rotateZ(0)\";\r\n        yMode = false;\r\n        gMode = true;\r\n        mapWindow.innerHTML = \"\";\r\n    });\r\n\r\n\r\n    let wrapper = document.querySelector(\".route-wrapper\"),\r\n        newPoint = document.querySelector(\".point\"),\r\n        nums = 0,\r\n        pointList = [];\r\n    \r\n    function stylingWrapper(n) {                    //изменение обертки и положения кнопки.\r\n        newPoint.style.top = 57 * n + 10 + \"px\";\r\n        wrapper.style.height =  57 * n + 60 + \"px\";\r\n    }\r\n\r\n    function removeInput(element, input) {\r\n        for(let i in pointList) {\r\n            if(pointList[i].id == element.parentElement.getAttribute(\"id\")){\r\n                pointList.splice(i, 1);\r\n\r\n                for(let j = i; j < pointList.length; j++) {\r\n                    pointList[j].id = j;\r\n                    pointList[j].point.setAttribute(\"id\", `${j}`);\r\n                    pointList[j].point.style.top = 7 + 57 * j + \"px\"; // перемещаем все инпуты, ниже удаленного на одну позицию вверх\r\n                }\r\n            }\r\n        }\r\n        input.removePoint();\r\n        nums--;\r\n        stylingWrapper(nums);\r\n\r\n        yMode ? Object(_parts_mapsy__WEBPACK_IMPORTED_MODULE_1__[\"updateYandexRoute\"])(route, pointList) : Object(_parts_mapsg__WEBPACK_IMPORTED_MODULE_2__[\"renderRoute\"])(pointList, ...displayAndService);\r\n    }\r\n\r\n    stylingWrapper(nums);\r\n\r\n    let startHeight,\r\n        targetItem;\r\n\r\n   \r\n    newPoint.addEventListener('click', () => {\r\n        \r\n        if (yMode || gMode) {\r\n            let div = new _parts_pointClass__WEBPACK_IMPORTED_MODULE_0__[\"default\"](nums);\r\n            div.addPoint(wrapper);\r\n            div.point.querySelector(\"input\").addEventListener('change', () => {\r\n                div.getAdress();\r\n\r\n                if (pointList.length == 0){\r\n\r\n                    if (mapWindow.innerHTML != \"\" && route === undefined) mapWindow.innerHTML = \"\";\r\n                    yMode ? route = Object(_parts_mapsy__WEBPACK_IMPORTED_MODULE_1__[\"createYandexRoute\"])(div.adress, map, route) : displayAndService = Object(_parts_mapsg__WEBPACK_IMPORTED_MODULE_2__[\"createGoogleRoute\"])(mapWindow, map);\r\n                    pointList.push(div);\r\n                   \r\n                } else {\r\n                    pointList.push(div);\r\n                    yMode ? Object(_parts_mapsy__WEBPACK_IMPORTED_MODULE_1__[\"updateYandexRoute\"])(route, pointList) : Object(_parts_mapsg__WEBPACK_IMPORTED_MODULE_2__[\"renderRoute\"])(pointList, ...displayAndService);\r\n                }\r\n            });\r\n    \r\n            let deleteBtn = div.point.querySelector(\".close\");\r\n    \r\n            deleteBtn.addEventListener('click', (event) => {  \r\n                    if(confirm(\"Удалить точку?\")) removeInput(event.target, div);\r\n                });\r\n    \r\n            nums++;\r\n            stylingWrapper(nums);\r\n    \r\n\r\n            div.point.addEventListener('mousedown', (event) => {\r\n                \r\n                if (!event.target.classList.contains(\"close\") &&\r\n                !event.target.classList.contains(\"input\") && nums > 1) {\r\n                    \r\n                    startHeight = parseInt(event.target.style.top.slice(0,-2));\r\n                    targetItem = parseInt(event.target.id);\r\n    \r\n                    div.dragable = true;\r\n    \r\n                    div.point.style.zIndex = 1000;\r\n                    div.point.classList.add(\"move\");\r\n                } \r\n    \r\n                div.point.addEventListener('mousemove', (event) => {\r\n                    event.preventDefault();\r\n                    if(div.dragable){\r\n                        div.point.style.top = event.pageY - wrapper.offsetTop - 15 + 'px';\r\n                    }\r\n    \r\n                });\r\n    \r\n                div.point.addEventListener('mouseup', (event) => {\r\n    \r\n                    if(div.dragable){\r\n    \r\n                        div.dragable = false;\r\n                        event.target.style.zIndex = 800;\r\n                        div.point.classList.remove(\"move\");\r\n    \r\n                        div.point.onmousemove = null;\r\n                        div.point.onmouseup = null;\r\n    \r\n                        let h = parseInt(div.point.style.top.slice(0,-2)); \r\n                        h < 0 ? div.point.style.top = \"7px\" : div.point.style.top = h - h%57 + 7 + \"px\";\r\n                        \r\n                        let diff = ((h - h%57 + 7 - startHeight) / 57) | 0; // насколько элементов сдвинулись\r\n                        // if(diff == 0) {\r\n    \r\n                        // }\r\n                        \r\n                        let temp = pointList[targetItem];\r\n                        \r\n                        if(diff > 0) {\r\n                            for(let j = targetItem; j < (targetItem + diff); j++){\r\n                                \r\n                                pointList[j] = pointList[j + 1];\r\n                                pointList[j].id = j;\r\n                                pointList[j].point.setAttribute(\"id\", `${j}`);\r\n                                pointList[j].point.style.top = 7 + 57 * j + \"px\";\r\n                            }\r\n                            pointList[targetItem + diff] = temp;\r\n                            pointList[targetItem + diff].id = targetItem + diff;\r\n                            pointList[targetItem + diff].point.setAttribute(\"id\", `${targetItem + diff}`);\r\n                            pointList[targetItem + diff].point.style.top = 7 + 57 * (targetItem + diff) + \"px\";\r\n\r\n                            yMode ? Object(_parts_mapsy__WEBPACK_IMPORTED_MODULE_1__[\"updateYandexRoute\"])(route, pointList) : Object(_parts_mapsg__WEBPACK_IMPORTED_MODULE_2__[\"renderRoute\"])(pointList, ...displayAndService);\r\n                        }\r\n    \r\n                        if(diff < 0) {\r\n                            for(let j = targetItem; j > targetItem + diff; j--){ \r\n                                pointList[j] = pointList[j - 1];\r\n                                pointList[j].id = j;\r\n                                pointList[j].point.setAttribute(\"id\", `${j}`);\r\n                                pointList[j].point.style.top = 7 + 57 * j + \"px\";\r\n                            }\r\n                            pointList[targetItem + diff] = temp;\r\n                            pointList[targetItem + diff].id = targetItem + diff;\r\n                            pointList[targetItem + diff].point.setAttribute(\"id\", `${targetItem + diff}`);\r\n                            pointList[targetItem + diff].point.style.top = 7 + 57 * (targetItem + diff) + \"px\";\r\n    \r\n                            yMode ? Object(_parts_mapsy__WEBPACK_IMPORTED_MODULE_1__[\"updateYandexRoute\"])(route, pointList) : Object(_parts_mapsg__WEBPACK_IMPORTED_MODULE_2__[\"renderRoute\"])(pointList, ...displayAndService);\r\n                        }\r\n                    }\r\n                });\r\n            });\r\n        } else {\r\n            alert(\"Выберете систему\");\r\n        }\r\n    });\r\n});\r\n\r\n\r\n\r\n/* баги :\r\n\r\n    1. если номера дома не существует, то берется дом по умолчанию, если при втором вводе одной и той же улицы\r\n       дом опять не существует, то в массиве пути одинаковые объекты и яндекс не может выставить масштаб\r\n\r\n    2. если в существующей точке поменять адрес, то в pointList не затрется предыдущий, а новый добавится\r\n    3. можно перетаскивать пустой инпут -> рушится скрипт\r\n\r\n*/\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./parts/mapsg.js":
/*!************************!*\
  !*** ./parts/mapsg.js ***!
  \************************/
/*! exports provided: createGoogleRoute, renderRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createGoogleRoute\", function() { return createGoogleRoute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderRoute\", function() { return renderRoute; });\n\r\n\r\nfunction createGoogleRoute(elem, map) {\r\n\r\n    map = new google.maps.Map(elem, {\r\n      center: {lat: 55.76, lng: 37.64},\r\n      zoom: 10\r\n    });\r\n\r\n    let directionsService= new google.maps.DirectionsService;\r\n    let directionsDisplay = new google.maps.DirectionsRenderer({map: map}); \r\n    let arr = [];\r\n\r\n    arr.push(directionsService);\r\n    arr.push(directionsDisplay);\r\n\r\n    return arr;       \r\n}\r\n\r\n\r\nfunction renderRoute(list, directionsService, directionsDisplay) {\r\n           \r\n  let start = list[0].adress,\r\n      stop = list[list.length - 1].adress,\r\n      routeList = [];\r\n\r\n  if (list.length > 2) {\r\n    for (let i = 1; i < list.length - 1; i++) {\r\n      routeList.push({\r\n        location: list[i].adress,\r\n        stopover: true\r\n      });\r\n    }\r\n  }\r\n\r\n  directionsService.route({\r\n      origin: start,\r\n      destination: stop,\r\n      waypoints: routeList,\r\n      travelMode: 'DRIVING'\r\n    }, (response, status) => {\r\n\r\n    if (status === 'OK') {\r\n      directionsDisplay.setDirections(response);\r\n    } else {\r\n      alert('Directions request failed due to ' + status);\r\n    }\r\n  });\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./parts/mapsg.js?");

/***/ }),

/***/ "./parts/mapsy.js":
/*!************************!*\
  !*** ./parts/mapsy.js ***!
  \************************/
/*! exports provided: createYandexRoute, updateYandexRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createYandexRoute\", function() { return createYandexRoute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateYandexRoute\", function() { return updateYandexRoute; });\n\r\n\r\nfunction createYandexRoute(adress, map, route){\r\n    map = new ymaps.Map(\"map\", {\r\n        center: [55.76, 37.64],\r\n        zoom: 10,\r\n        controls: ['zoomControl']\r\n    }\r\n    );\r\n\r\n    route = new ymaps.multiRouter.MultiRoute({\r\n        referencePoints: [\r\n            `${adress}`\r\n        ],\r\n        params:\r\n        {   \r\n            results: 1\r\n        }},\r\n        {\r\n            boundsAutoApply: true\r\n        }\r\n    );\r\n    \r\n    map.geoObjects.add(route);\r\n    route.events.add(\"change\", () => {\r\n        if(route.model.getReferencePoints().length > 1) map.setBounds(route.getBounds());\r\n    });\r\n\r\n    return route;\r\n}\r\n\r\nfunction updateYandexRoute(newRoute, list){\r\n    let routeList = [];\r\n    \r\n    for (let item of list) {\r\n        routeList.push(item.adress);\r\n    }\r\n    newRoute.model.setReferencePoints(routeList);\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./parts/mapsy.js?");

/***/ }),

/***/ "./parts/pointClass.js":
/*!*****************************!*\
  !*** ./parts/pointClass.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\nclass Point {\r\n    constructor(id){\r\n        this.id = id;\r\n        this.adress = \"\";\r\n        this.dragable = false;\r\n        this.point = document.createElement(\"div\");\r\n        this.content = '<input type=\"text\" class=\"input\">\\\r\n                        <button class=\"close\">&times;</button>';\r\n    }\r\n\r\n    addPoint(elem){\r\n        this.point.classList.add(\"route-item\");\r\n        this.point.innerHTML = this.content;\r\n        this.point.style.top = 7 + 57 * (this.id) + \"px\";\r\n        this.point.setAttribute(\"id\", `${this.id}`);\r\n\r\n        elem.appendChild(this.point);\r\n\r\n        this.point.style.opacity = 0;\r\n        setTimeout(() => this.point.style.opacity = 1, 400);\r\n    }\r\n\r\n    removePoint(){\r\n        this.point.remove();\r\n    }\r\n\r\n    getAdress(){\r\n        this.adress = this.point.querySelector(\"input\").value;\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Point);\n\n//# sourceURL=webpack:///./parts/pointClass.js?");

/***/ })

/******/ });