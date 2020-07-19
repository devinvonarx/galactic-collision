var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.Value;

slider.oninput = function() {
    output.innerHTML = this.value;
}