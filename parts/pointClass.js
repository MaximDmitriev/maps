"use strict";

class Point {
    constructor(id){
        this.id = id;
        this.adress = "";
        this.dragable = false;
        this.point = document.createElement("div");
        this.content = '<input type="text" class="input">\
                        <button class="close">&times;</button>';
    }

    addPoint(elem){
        this.point.classList.add("route-item");
        this.point.innerHTML = this.content;
        this.point.style.top = 7 + 57 * (this.id) + "px";
        this.point.setAttribute("id", `${this.id}`);

        elem.appendChild(this.point);

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

export default Point;