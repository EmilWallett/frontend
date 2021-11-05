var webbServerIp = "http://its.teknikum.it:8080/",
  serverPath = "sustaining_backend/api/";
var webbServerAdress = webbServerIp + serverPath;

var danielTestar; //Getting Array into Variable
var data = {
  nrOfPictures: 2500,
  nrOfVotes: 3400,
  nrOfFames: 1500,
  nrOfShames: 1000,
  nrOfUsers: 112,
  percentageOfFame: 0,
  percentageOfShame: 0
};

window.onload = function() {
  doFetch();
};

function doFetch() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(Response => Response.json())
    .then(data => {

      data.forEach(element => {
        console.log(element.id);
        console.log(element.title);
      });
    });
}
