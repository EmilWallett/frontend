let appElement = document.getElementById("mainAppBox");
let imageElement = document.getElementById("appImage");
var imageIDArrayRemember = [];

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
	constructor(comments, image, rating, user) {
		this.image = {
			"id":image.id,
			"title": image.title,
			"date":image.date,
			"image":image.image,
			"location":image.location,
			"userID": image.userID
		};
		this.rating = rating;
		this.user = user;
		this.comments = comments;
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
	var postAr = await AskServerForPost();
	let saftyStop = 0;

	//check so that the user hasen't alredy seen the post this sesion
	while(CheckImgIDIsUsed(postAr[0].image.id) && saftyStop < 1000){
		postAr = await AskServerForPost();
		saftyStop++;
	}
	if(!(saftyStop < 1000)){
		//if it goes in here it tried 1000 times and failed to get a post that has not alredy been seen
		
	}
	// if saftyStop was not triggerd, so a post is now located in postAr[0]
	else{
		var post = postAr[0];
		console.log(post);
		currentPost = new Post(post.comments, post.image, post.rating, post.user);
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
			else if(element.rating == 0)
			{
				shameAmount += 1;
			}
		});

		fameText.setText(fameAmount + "");
		shameText.setText(shameAmount + "");
	}
}

async function AskServerForPost(){
	const response = await fetch("http://94.46.140.3:8080/sustain_backend/api/posts/1");
	const json = await response.json();
	return json;
}

async function AskServerForRatings(imageID){
	const response = await fetch("http://94.46.140.3:8080/sustain_backend/api/rating/" + imageID);
	const json = await response.json();
	return json;
}

function CheckImgIDIsUsed(imageID){
	imageIDArrayRemember.forEach(element => {
		if (imageID == element) {
			return true;
		}
	});
	return false;
}

function FamePress(){


	LoadPost();
}

function ShamePress(){
	
	
	LoadPost();
}

LoadPost();

