let appElement = document.getElementById("mainAppBox");
let imageElement = document.getElementById("appImage");
var imageIDArrayRemember = [];
var imageIDCounter = 0;
var firstRun = true;
var startPos = 1;

class text{
	constructor(elementID){
		let element = document.getElementById(elementID);
		this.setText = function(string){
			element.innerHTML = string;
		}
	}
}

class image{
	constructor(elementID){
		let element = document.getElementById(elementID);
		this.setImgAlt = function(data, alt){
			element.src = data;
			element.alt = alt;
		}
		this.setImg = function(data){
			element.src = data;
		}
	}
}

class Post{
	constructor(comments, image) {
		this.image = {
			"id":image.id,
			"title": image.title,
			"date":image.date,
			"image":image.image,
			"location":image.location,
			"userID": image.userID
		};
		this.rating = image.rating; //int
		this.user = image.username;
		this.comments = comments;
	}
}

class imageObj{
	constructor(image){
		this.id = image.id;
		this.title = image.title;
		this.date = image.date;
		image = image.image;
		location = image.location;
		userID = image.userID;
	}
}

var titleText = new text("titleText");
var userText = new text("userText");
var fameText = new text("fameNumbText");
var shameText = new text("shameNumbText");
var appImg = new image("appImage");
var currentPost;

async function LoadPost(){
	//Requsets a post from the server
	var post;
	let saftyStop = 0;


	if(firstRun){
		loadProgress();
		post = await AskServerForPost(startPos);
		firstRun = false;
	}
	else{
		post = await AskServerForPost(currentPost.image.id);
	}

	console.log(post);
	//check so that the user hasen't alredy seen the post this sesion
	/*do {
		imageIDCounter++;
		post = await AskServerForPost(imageIDCounter);
		saftyStop++;
		
	} while(!CheckImgIDActive(post) && saftyStop < 20);
	*/

	if(!(saftyStop < 20)){
		//if it goes in here it tried 20 times and failed to get a post that has not alredy been seen
		
	}
	// if saftyStop was not triggerd, so a post is now located in postAr[0]
	else{
		currentPost = new Post(post.comments, post.image);
		userText.setText(currentPost.user);
		titleText.setText(currentPost.image.title);
		appImg.setImgAlt(currentPost.image.image, currentPost.image.title);

		//gets the ratings for the image
		var rating = await AskServerForRatings(currentPost.image.id);
		console.log(rating);

		//counts amount of Fame and shame
		let fameAmount = 0, shameAmount = 0;
		rating.forEach(element => {
			if(element.rating == 1){
				fameAmount += 1;
			}
			else if(element.rating == -1)
			{
				shameAmount += 1;
			}
		});

		fameText.setText(fameAmount + "");
		shameText.setText(shameAmount + "");
	}
}

async function AskServerForPost(imageID){
	const response = await fetch("http://94.46.140.3:8080/sustain_backend/api/post/" + imageID);
	const json = await response.json();
	return json;
}

async function AskServerForRatings(imageID){
	const response = await fetch("http://94.46.140.3:8080/sustain_backend/api/rating/" + imageID);
	const json = await response.json();
	return json;
}

function CheckImgIDActive(post){
	if(post == null){
		return false;
	}
	else{
		return true;
	}
}

async function FamePress(){
	await RatingSend(true);

	LoadPost();
}

async function ShamePress(){
	await RatingSend(false);
	
	LoadPost();
}

LoadPost();


async function RatingSend(fame){
	let ratingNumb;
	if(fame){
		ratingNumb = 1;
	}
	else{
		ratingNumb = -1;
	}
	let response = await fetch("http://94.46.140.3:8080/sustain_backend/api/rating/" + currentPost.image.id, {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			rating: ratingNumb,
			userID: 1,
			imageID: currentPost.image.id
		})
	});
}

//window.onunload = saveProgress;

function saveProgress(){
	var toLoad = currentPost.image.id - 1;
	localStorage.setItem("imgIDToLoad", toLoad);
}

function loadProgress(){
	var toLoad = localStorage.getItem("imgIDToLoad");
	if(toLoad != null){
		startPos = parseInt(toLoad);
	}
}
