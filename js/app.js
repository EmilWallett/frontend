let appElement = document.getElementById("mainAppBox");
let imageElement = document.getElementById("appImage");
var imageIDArrayRemember = [];
var imageIDCounter = 0;
var firstRun = true;
var startPos = 1;
var webbServerIp = "http://its.teknikum.it:9000/";
var serverPath = "sustain_backend/api/";
//var webbServerIp = "http://localhost:8080/";
//var serverPath = "backend/api/";
var webbServerAdress = webbServerIp + serverPath;

var errorCard = {
	image:{
		title:"Not found",
		username:"Not found",
		image:""
	}

};

class text{
	constructor(elementID){
		let element = document.getElementById(elementID);
		this.set = function(string){
			element.innerHTML = string;
		}
	}
}

class image{
	constructor(elementID){
		let element = document.getElementById(elementID);
		this.setSrcAlt = function(data, alt){
			element.src = data;
			element.alt = alt;
		}
		this.setSrc = function(data){
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

class comment{
	constructor(comment){
		this.id = comment.id;
		this.imageID = comment.imageID;
		this.userID = comment.userID;
		this.text = comment.text;
		this.date = comment.date;

		this.element = this.makeElement(this.id);
		this.mainText = new text("ct" + this.id);
		this.dateText = new text("dt" + this.id);
		this.usernameText = new text("ut" + this.id);
		
	}

	makeElement(commentID){
		let element = document.createElement("article");
		element.classList.add("commentBox");
		element.id = "c" + commentID;

		let mainText = document.createElement("p");
		mainText.classList.add("commentText");
		mainText.id = "ct" + commentID;

		let dateText = document.createElement("p");
		dateText.classList.add("commentDate");
		dateText.id = "dt" + commentID;

		let usernameText = document.createElement("p");
		usernameText.classList.add("commentUsername");
		usernameText.id = "ut" + commentID;
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
	
	try {
		if(firstRun){
			loadProgress();
			post = await AskServerForPost(startPos);
			firstRun = false;
		}
		else{
			post = await AskServerForPost(currentPost.image.id);
		}


		currentPost = new Post(post.comments, post.image);
		userText.set(currentPost.user);
		titleText.set(currentPost.image.title);
		appImg.setSrcAlt(currentPost.image.image, currentPost.image.title);

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

		fameText.set(fameAmount + "");
		shameText.set(shameAmount + "");
	} 
	catch (error) {
		post = errorCard;
		currentPost = new Post(post.comments, post.image);
		userText.set(currentPost.user);
		titleText.set(currentPost.image.title);
		appImg.setSrcAlt(currentPost.image.image, currentPost.image.title);
		fameText.set("Not found");
		shameText.set("Not found");
	}
	

	console.log(post);
	//check so that the user hasen't alredy seen the post this sesion
	/*do {
		imageIDCounter++;
		post = await AskServerForPost(imageIDCounter);
		saftyStop++;
		
	} while(!CheckImgIDActive(post) && saftyStop < 20);
	*/
	
	
}

async function AskServerForPost(imageID){
	const response = await fetch(webbServerAdress + "post/" + imageID);
	const json = await response.json();
	return json;
}

async function AskServerForRatings(imageID){
	const response = await fetch(webbServerAdress + "rating/" + imageID);
	const json = await response.json();
	return json;
}

async function AskServerForComments(imageID){
	const response = await fetch(webbServerAdress + "comment/" + imageID)
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
	let response = await fetch(webbServerAdress + "rating/" + currentPost.image.id, {
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

class Comments{
	createCommentElement(comment){
		this.commentElement = document.createElement("article");
		
	}
}