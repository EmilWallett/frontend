//Image encoding
var imageData;
var titleData = "";
var imageLoaded = false, loggedIn = false, ratingSet = true;
var famebox = false, shamebox = false;
var fbox = document.getElementById("fameCheckBox"), sbox = document.getElementById("shameCheckBox");
var webbServerIp = "http://its.teknikum.it:9000/", serverPath = "sustaining_backend/api/";
var webbServerAdress = webbServerIp + serverPath;

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

function FameBoxChange(value){

}

function ShameBoxChange(value){
	famebox != famebox;
	if(famebox){
		value = on;
	}
	else{
		value = off;
	}
}

function tryToPost(){
	if(titleData != "" && imageLoaded && user.isSignedIn()){
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
			date: "2019-12-05",
			location: "TEST-location",
		})
	});
	//const json = await response.json();
	//return json;
}
