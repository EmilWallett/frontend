//Image encoding
var rating =0;
var titleData ="";
function encodeImageFileAsURL() { // <- Function to encode an image or anything else
	var srcData;
	var filesSelected = document.getElementById("inputFileToLoad").files;
	if (filesSelected.length > 0) {
		var fileToLoad = filesSelected[0];
		var fileReader = new FileReader();
		fileReader.onload = function (fileLoadedEvent) {
			srcData = fileLoadedEvent.target.result; // <--- data: base64
			var newImage = document.createElement('img');
			newImage.src = srcData;
			document.getElementById("imgTest").innerHTML = newImage.outerHTML;
			console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);

		}
		fileReader.readAsDataURL(fileToLoad);
		//let result= postData(srcData);
		//console.log(result);
		document.getElementById("upload-btn").onclick = () => postData(srcData, rating);

	}
}
function addratingFame(){
 rating= 1;
 console.log("rated fame");
}
function TitleChange(){
titleData	=document.getElementById("titleText").var;
}
function addratingShame(){
 rating= -1;
 console.log("rated shame")
}


async function postData(imageData, rating, titleData) {
	console.log("in postData")
	let response = await fetch("http://94.46.140.3:8080/sustain_backend/api/image", {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			image: imageData,
			userID: "1",
			title: titleData,
			date: "2019-12-05",
			location: "TEST-location",
			rating: 0
		})
	});
	const json = await response.json();
	return json;
	alert("your image has been uploaded")

}
