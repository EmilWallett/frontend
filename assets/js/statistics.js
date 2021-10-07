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

function doFetch() {
  var posts = getPosts();
  post.forEach(post => {

  });
}
const getPosts = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => {
      console.log(posts);
      danielTestar = posts[1].title;
    }) //how to get the Variable into an Variable
}
