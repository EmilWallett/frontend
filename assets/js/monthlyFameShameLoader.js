var fameContainer = document.getElementById("fameImages");
var shameContainer = document.getElementById("shameImages");

var fImgs = [fameContainer.firstElementChild, fameContainer.lastElementChild]
var sImgs = [shameContainer.firstElementChild, shameContainer.lastElementChild]

window.onload = function(){
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(Response => Response.json())
        .then(data => {
            data.forEach(element => {
                console.log(element.id);
                console.log(element.title);
            });
        });
};