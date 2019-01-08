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
    }
    



    function stylingWrapper(n) {                    //изменение обертки и положения кнопки.
        newPoint.style.top = 57 * n + 10 + "px";
        wrapper.style.height =  57 * n + 60 + "px";
    }

    stylingWrapper(nums);


    newPoint.addEventListener('click', () => {
        
        let div = new Point(nums);
        div.addPoint();
        pointList.push(div);
        // console.log(pointList);

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

        nums++;
        stylingWrapper(nums);

        function move(e) {
            div.point.style.top = e.pageY - wrapper.offsetTop - 15 + 'px';
        }
        
        div.point.addEventListener('mousedown', (event) => {
            // console.log("mousedown");
            let startHeight = parseInt(div.point.style.top.slice(0,-2));
    
            if(!event.target.classList.contains("close") && !event.target.classList.contains("input") && nums > 1) {

                move(event);
                div.point.classList.add("move");
                div.point.style.zIndex = 1000; 
    
                document.addEventListener('mousemove', move);
    
                div.point.addEventListener('mouseup', (event) => {
                    // console.log(pointList);
                    // console.log("mouseup");
                    event.target.style.zIndex = 900;
                    let targetItem = parseInt(event.target.id);
                    // console.log(targetItem);
                    document.removeEventListener('mousemove', move);
                    div.point.onmouseup = null;
                    div.point.classList.remove("move");

                    let h = parseInt(div.point.style.top.slice(0,-2)); 
                    h < 0 ? div.point.style.top = "7px" : div.point.style.top = h - h%57 + 7 + "px";
                    
                    let diff = (((h - h%57 + 7) - startHeight) / 57) | 0; // насколько элементов сдвинулись
                    // console.log(diff);

                    if(diff == 0) h = startHeight;

                    let temp = pointList[targetItem];
                    // console.log("targetItem: " + targetItem);

                    if(diff > 0) {
                        // console.log("plus");
                        for(let j = targetItem; j < (targetItem + diff); j++){
                            
                            // console.log(pointList);
                            pointList[j] = pointList[j + 1];
                            pointList[j].id = j;
                            pointList[j].point.setAttribute("id", `${j}`);
                            pointList[j].point.style.top = 7 + 57 * j + "px";
                        }
                        pointList[targetItem + diff] = temp;
                        pointList[targetItem + diff].id = targetItem + diff;
                        pointList[targetItem + diff].point.setAttribute("id", `${targetItem + diff}`);
                        pointList[targetItem + diff].point.style.top = 7 + 57 * (targetItem + diff) + "px";
      
                    }

                    if(diff < 0) {
                        // console.log("minus");
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
                        // console.log(pointList);
                    }
                });
            } 
            // else {
            //     console.log("close");
            // }
        });



    });








});




