let input = document.querySelector(".route-item"),
    wrapper = document.querySelector(".route-wrapper");

let wrapStyle = getComputedStyle(wrapper);

console.log(wrapper.offsetTop);

function move(e) {
  // input.style.left = parseInt(wrapStyle.marginLeft.slice(0, -2)) +  10 + 'px';
  // input.style.top = e.pageY - input.offsetHeight * 2 + 'px';
  input.style.top = e.pageY - wrapper.offsetTop - 5 + 'px';
}

input.addEventListener('mousedown', (event) => {
  console.log(event);
  move(event);
  input.style.zIndex = 1000; 

  document.addEventListener('mousemove', move);

  input.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', move);
    input.onmouseup = null;
    let h = parseInt(input.style.top.slice(0,-2)); 
    input.style.top = h - h%50 + 5 + "px";
  });
});

