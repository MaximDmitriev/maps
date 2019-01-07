let input = document.getElementById('ball'),
    wrapper = document.querySelector(".route-wrapper");

let wrpapStyle = getComputedStyle(wrapper);

function move(e) {
  // input.style.left = parseInt(wrpapStyle.marginLeft.slice(0, -2)) +  10 + 'px';
  input.style.top = e.pageY - input.offsetHeight * 2 + 'px';
}

input.addEventListener('mousedown', (event) => {

  move(event);
  input.style.zIndex = 1000; 

  document.addEventListener('mousemove', move);

  input.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', move);
    input.onmouseup = null;
    let h = parseInt(input.style.top.slice(0,-2)); 
    input.style.top = h - h%30 + 5 + "px";
  });
});

