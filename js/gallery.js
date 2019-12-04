
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

	for (let index = 0; index < 9; index++) {
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

	let divElement = document.createElement("div");
	divElement.className = "usernameAndTitleBox";


	let textElementUsername = document.createElement("p");
	textElementUsername.className = "username";
	let textNodeUsername = document.createTextNode(username);
	textElementUsername.appendChild(textNodeUsername);
	divElement.appendChild(textElementUsername);

	let textElementTitle = document.createElement("p");
	textElementTitle.className = "title";
	let textNodeTitle = document.createTextNode(title);
	textElementTitle.appendChild(textNodeTitle);
	divElement.appendChild(textElementTitle);

	returnElement.appendChild(divElement);
	
	//this is what the returnElement looks like
	//<section class="gallery-box" id="boxID">
	//	<img src="imageURL" alt="title">
	//	<div class="usernameAndTitleBox">
	//		<p class="username">username</p>
	// 		<p class="title">title</p>
	//	</div>
	//</section>

	return returnElement;
}