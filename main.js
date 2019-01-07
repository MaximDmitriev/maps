"use strict";

document.addEventListener('DOMContentLoaded', () => {

    let input = document.querySelector(".route-item"),
        wrapper = document.querySelector(".route-wrapper"),
        newPoint = document.querySelector(".point"),
        nums = 0,
        pointList = [];


    class Point {
        constructor(id){
            this.id = id;
            this.point = document.createElement("div");
            this.content = '<input type="text">\
                            <button class="close">&times;</button>';
        }
        addPoint(){
            this.point.classList.add("route-item");
            this.point.innerHTML = this.content;
            this.point.style.top = 7 + 57 * (nums - 1) + "px";
            this.point.setAttribute("id", `${this.id}`);

            wrapper.appendChild(this.point);

            this.point.style.opacity = 0;
            setTimeout(() => this.point.style.opacity = 1, 400);
        }
        removePoint(){
            this.point.remove();
        }
    }
    



    function stylingWrapper(n) {                    //изменение обертки и положения кнопки.
        newPoint.style.top = 57 * n + 10 + "px";
        wrapper.style.height =  57 * n + 60 + "px";
    }

    stylingWrapper(nums);


    newPoint.addEventListener('click', () => {
        nums++;
        stylingWrapper(nums);

        let div = new Point(nums);
        div.addPoint();
        pointList.push(div);

        let deleteBtn = div.point.querySelector(".close");

        deleteBtn.addEventListener('click', (event) => {  
                if(confirm("Удалить точку?")) {

                    for(let i in pointList) {
                        if(pointList[i].id == event.target.parentElement.getAttribute("id")){
                            pointList.splice(i, 1);

                            for(let j = i; j < pointList.length; j++) {
                                pointList[j].point.style.top = 7 + 57 * j + "px"; // перемещаем все инпуты, ниже удаленного на одну позицию вверх
                            }
                            
                        }
                    }

                    div.removePoint();
                    nums--;
                    stylingWrapper(nums);
                }
            });


            function move(e) {
                div.point.style.top = e.pageY - wrapper.offsetTop - 15 + 'px';
            }
            
            div.point.addEventListener('mousedown', (event) => {
        
                if(!event.target.classList.contains("close") && nums > 1) {

                    move(event);
                    div.point.classList.add("move");
                    div.point.style.zIndex = 1000; 
        
                    document.addEventListener('mousemove', move);
        
                    div.point.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', move);
                    div.point.onmouseup = null;
                    div.point.classList.remove("move");
                    let h = parseInt(div.point.style.top.slice(0,-2)); 
                    div.point.style.top = h - h%57 + 5 + "px";
                    });


                } 
                // else {
                //     console.log("close");
                // }
            });



    });








});




