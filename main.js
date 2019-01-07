"use strict";

document.addEventListener('DOMContentLoaded', () => {

    let input = document.querySelector(".route-item"),
        wrapper = document.querySelector(".route-wrapper"),
        newPoint = document.querySelector(".point"),
        nums = 0;


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

        let deleteBtn = div.point.querySelector(".close");

        deleteBtn.addEventListener('click', () => {  
                if(confirm("Удалить точку?")) {
                    div.removePoint();
                    nums--;
                    stylingWrapper(nums);
                }
            });
    });



    function move(e) {
        input.style.top = e.pageY - wrapper.offsetTop - 15 + 'px';
    }

    input.addEventListener('mousedown', (event) => {

        if(event.target.classList.contains("close")) {
            console.log("close");
        } else {
            move(event);
            input.classList.add("move");
            input.style.zIndex = 1000; 

            document.addEventListener('mousemove', move);

            input.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', move);
            input.onmouseup = null;
            input.classList.remove("move");
            let h = parseInt(input.style.top.slice(0,-2)); 
            input.style.top = h - h%57 + 5 + "px";
            });
        }
    });




});




