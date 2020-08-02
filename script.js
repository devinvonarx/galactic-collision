var slider = document.getElementById(id="bar");//This code has a few mistakes. myRange is a class not an Id and demo is a type, not an Id.
var a = 0
var disp = document.getElementById("disp");
disp.innerHTML = "the js variable 'a' currently = " + a;

slider.addEventListener("change", function(){
  a = slider.value;
  disp.innerHTML = "the js variable 'a' currently = " + a;
})
