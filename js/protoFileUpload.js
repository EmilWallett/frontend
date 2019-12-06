//Image encoding
var imageData;
var titleData = "";
var imageLoaded = false;
var famebox = false, shamebox = false;
var fbox = document.getElementById("fameCheckBox"), sbox = document.getElementById("shameCheckBox");

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
			console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);

		}
		fileReader.readAsDataURL(fileToLoad);
		//let result= postData(srcData);
		//console.log(result);
		imageData = srcData;
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
	if(document.getElementById("fameCheckBox").value == "on"){
		ratingData = 1;
	}
	else{
		ratingData = -1;
	}

	if(titleData != "" && imageLoaded){
		postData(imageData, titleData, ratingData);
		alert("image has been uploaded");
	}
	else if(titleData == ""){
		alert("it needs a title");
	} else if(!imageLoaded){
		alert("you need to upload an image");
	} else if(!ratingSet){
		alert("you need to rate it");
	}
}

async function postData(imageData, title) {
	console.log("in postData")
	let response = await fetch("http://94.46.140.3:8080/sustain_backend/api/image", {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			image: imageData,
			userID: "1",
			title: title,
			date: "2019-12-05",
			location: "TEST-location",
			rating: 0
		})
	});
	const json = await response.json();
	return json;
}
