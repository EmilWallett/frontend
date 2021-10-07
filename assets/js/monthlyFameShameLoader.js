var fameContainer = document.getElementById("fameImages");
var shameContainer = document.getElementById("shameImages");

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