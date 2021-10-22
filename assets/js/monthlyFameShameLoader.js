var fameContainer = document.getElementById("fameImages");
var shameContainer = document.getElementById("shameImages");

var fImgs = [fameContainer.firstElementChild, fameContainer.lastElementChild]
var sImgs = [shameContainer.firstElementChild, shameContainer.lastElementChild]

console.log(fImgs[0].tagName);
console.log(fImgs[1].tagName);


window.onload = function(){
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(Response => Response.json())
        .then(data => {
            data.forEach(element => {
                console.log(element.id);
                console.log(element.title);

                return; //stops the function from executing any more code

                fImgs[0].href = data.firstFame;
                fImgs[1].href = data.secondFame;

                sImgs[0].href = data.firstShame;
                sImgs[1].href = data.secondShame;
            });
        });
};