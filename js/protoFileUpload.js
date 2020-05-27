//Image encoding
var imageData;
var titleData = "";
var imageLoaded = false, loggedIn = false, ratingSet = false;
var famebox = false, shamebox = false;
var fbox = document.getElementById("fameCheckBox"), sbox = document.getElementById("shameCheckBox");
var webbServerIp = "http://its.teknikum.it:9000/", serverPath = "sustaining_backend/api/";
var webbServerAdress = webbServerIp + serverPath;
var ratingIsFame;

let user = {
	isSignedIn : function() {
		return false;
	}
};

function onSignIn(googleUser) {
	user = googleUser;
}

function encodeImageFileAsURL() { // <- Function to encode an image or anything else
	var srcData;
	var filesSelected = document.getElementById("inputFileToLoad").files;
	if (filesSelected.length > 0) {
		var fileToLoad = filesSelected[0];
		var fileReader = new FileReader();
		fileReader.onload = function (fileLoadedEvent) {
			srcData = fileLoadedEvent.target.result; // <--- data: base64
			var imgElement = document.getElementById("imgPrew");
			imgElement.src = srcData;
			imgElement.style.visibility = "visible";
			imageData = srcData;
			console.log(srcData);

		}
		fileReader.readAsDataURL(fileToLoad);
		//let result= postData(srcData);
		//console.log(result);		
		imageLoaded = true;

	}
}

function TitleChange(value){
	titleData = value;
}

function FameClick(){
	ratingSet = true;
	ratingIsFame = true;
	ResetFameShameButtons();
	let fameButton = document.getElementById("fame-btn");
	fameButton.classList.add("currentlySelected");
}

function ShameClick(){
	ratingSet = true;
	ratingIsFame = false;
	ResetFameShameButtons();
	let shameButton = document.getElementById("shame-btn");
	shameButton.classList.add("currentlySelected");
}

function ResetFameShameButtons(){
	let fameButton = document.getElementById("fame-btn");
	let shameButton = document.getElementById("shame-btn");
	fameButton.classList = [];
	shameButton.classList = [];
}

function tryToPost(){
	if(titleData != "" && imageLoaded && user.isSignedIn() && ratingSet){
		postData(imageData, titleData, user);
		alert("image has been uploaded");
	}
	else if(titleData == ""){
		alert("it needs a title");
	} else if(!imageLoaded){
		alert("you need to upload an image");
	} else if(!ratingSet){
		alert("you need to rate it");
	} else if(!user.isSignedIn()){
		alert("You need to sign in");
	}
}

async function postData(imageData, title, currentUser) {
	let ratingNumb = 0;
	if(ratingIsFame){
		ratingNumb = 1;
	}
	else{
		ratingNumb = -1;
	}
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;

	let token = currentUser.getAuthResponse().id_token;
	let response = await fetch(webbServerAdress + "image", {
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		method: "POST",
		body: JSON.stringify({
			image: imageData,
			title: title,
			date: dateTime,
			location: "TEST-location",
			rating: ratingNumb
		})
	});
	//const json = await response.json();
	//return json;
}

async function PostRating(rating, currentUser, imageID){
	let token = currentUser.getAuthResponse().id_token;
	let response = await fetch(webbServerAdress + "rating/" + imageID, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		method: "POST",
		body: JSON.stringify({
			rating: rating,
			imageID: imageID
		})
	});
}
