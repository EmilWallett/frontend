
function CreateGalleryGrid(fame){
	var informationArray = [];
	if(fame){
		//server request for fame
		informationArray = AskServerForPosts(true);
		var appendElement = document.getElementById("fameBox");
	}
	else{
		//server request for shame
		informationArray = AskServerForPosts(false);
		var appendElement = document.getElementById("shameBox");
	}

	for (let index = 0; index < informationArray.length; index++) {
		const element = informationArray[index];
		let boxID = index + 1;
		boxID = "b" + boxID;
		
		let galleryBox = CreateGalleryBox(element.title, element.username, element.imageURL, boxID);
		appendElement.appendChild(galleryBox);
	}

}

function CreateGalleryBox(title, username, imageURL, boxID){
	let returnElement = document.createElement("section");
	returnElement.className = "gallery-box";
	returnElement.id = boxID;

	let imageElement = document.createElement("img");
	imageElement.src = imageURL;
	imageElement.alt = title;
	returnElement.appendChild(imageElement);

	let textElementUsername = document.createElement("p");
	textElementUsername.className = "username";
	let textNodeUsername = document.createTextNode(username);
	textElementUsername.appendChild(textNodeUsername);
	returnElement.appendChild(textElementUsername);

	let textElementTitle = document.createElement("p");
	textElementTitle.className = "title";
	let textNodeTitle = document.createTextNode(title);
	textElementTitle.appendChild(textNodeTitle);
	returnElement.appendChild(textElementTitle);

	return returnElement;
}



function AskServerForPosts(fame){
	let returnObj = [];
	if (fame) {
		returnObj[0] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[1] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[2] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[3] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[4] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[5] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[6] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[7] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[8] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
	} else {
		returnObj[0] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[1] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[2] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[3] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[4] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[5] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[6] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[7] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
		returnObj[8] = {
			"title": "",
			"username": "",
			"imageURL": ""
		}
	}
	return returnObj;
}
