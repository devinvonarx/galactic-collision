var slider = document.getElementById("bar");//This code has a few mistakes. myRange is a class not an Id and demo is a type, not an Id.
var disp = document.getElementById("disp");
disp.innerHTML = "the js variable 'NUM_STARS_ANDROMEDA' currently = " + NUM_STARS_ANDROMEDA;

slider.addEventListener("change", function(){
  NUM_STARS_ANDROMEDA = slider.value;
  disp.innerHTML = "the js variable 'NUM_STARS_ANDROMEDA' currently = " + NUM_STARS_ANDROMEDA;
})