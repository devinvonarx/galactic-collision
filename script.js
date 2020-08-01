var slider = document.getElementById("myRange");//This code has a few mistakes. myRange is a class not an Id and demo is a type, not an Id.
var output = document.getElementById("demo");
output.innerHTML = slider.Value;

slider.oninput = function() { 
    output.innerHTML = this.value;
}