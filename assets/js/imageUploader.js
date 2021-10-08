//Image encoding
var imageData;
var titleData = "";
var imageLoaded = false, ratingSet = false;
var famebox = false, shamebox = false;
var fbox = document.getElementById("fameCheckBox"), sbox = document.getElementById("shameCheckBox");
var webbServerIp = "http://its.teknikum.it:8080/", serverPath = "sustaining_backend/api/";
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
		fileReader.readAsDataURL(fileToLoad);
		fileReader.onload = function (fileLoadedEvent) {
			srcData = fileLoadedEvent.target.result; // <--- data: base64
			var imgElement = document.getElementById("imgPrew");
			imgElement.src = srcData;
			imgElement.style.visibility = "visible";
			imageData = srcData;
			console.log(srcData);

		}
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

	//Puts date into a string. Format: (yyyy-mm-dd)
	var today = new Date();
	let day = today.getDate() + "", month = (today.getMonth()+1) + "";
	if(day.length == 1){
		day = "0" + day;
	}
	if(month.length == 1){
		month = "0" + month
	}
	var date = today.getFullYear()+'-'+month+'-'+day;

	let token = currentUser.getAuthResponse().id_token;
	let response = await fetch(webbServerAdress + "image/", {
		headers: {
			"Content-Type": "application/json",
			"Authorization": token
		},
		method: "POST",
		body: JSON.stringify({
			image: imageData,
			title: title,
			date: date,
			location: "TEST-location",
			rating: ratingNumb
		})
	});
	//const json = await response.json();
	//return json;
}
/*
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
*/


/*
async function GetLocation(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(GetPlace);
	} else {
		console.log("Browser does not support location");
	}
}

async function GetPlace(position){
	console.log(position.coords);
	let response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude +","+position.coords.longitude+"&key=AIzaSyD9-Vka0EqR6qZKZZeS4wrek5Ue9ridPGc");
	let json = await response.json();
	json.results.forEach(element => {
		element.types.forEach(type => {
			if(type == "administrative_area_level_1"){
				console.log(element.formatted_address);
			}
		});
	});
}
*/
