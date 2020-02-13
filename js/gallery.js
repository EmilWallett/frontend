CreateGalleryGrid(true);
CreateGalleryGrid(false);

var errorCard = {
	image:{
		title:"Not found",
		username:"Not found",
		image:""
	}
};

async function CreateGalleryGrid(fame){
	var informationArray = [];
	try {
		if(fame){
			//server request for fame
			informationArray = await AskServerForPosts(true);
			var appendElement = document.getElementById("fameBox");
		}
		else{
			//server request for shame
			informationArray = await AskServerForPosts(false);
			var appendElement = document.getElementById("shameBox");
		}
	} catch (error) {
		if(fame){
			var appendElement = document.getElementById("fameBox");
		}
		else{
			var appendElement = document.getElementById("shameBox");
		}
		informationArray.push(errorCard);
		informationArray.push(errorCard);
		informationArray.push(errorCard);
	}
	

	for (let index = 0; index < informationArray.length; index++) {
		const element = informationArray[index];
		let boxClass = index + 1;
		boxClass = "b" + boxClass;
		
		let galleryBox = CreateGalleryBox(element.image.title, element.image.username, element.image.image, boxClass);
		appendElement.appendChild(galleryBox);
	}

}

function CreateGalleryBox(title, username, imageURL, boxClass){
	let returnElement = document.createElement("section");
	returnElement.className = "gallery-box";
	returnElement.classList.add(boxClass);

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

async function AskServerForPosts(fame){
	if(fame){
		const response = await fetch("http://94.46.140.3:8080/sustain_backend/api/posts/fame/9");
		const json = await response.json();
		return json;
	}
	else{
		const response = await fetch("http://94.46.140.3:8080/sustain_backend/api/posts/shame/9");
		const json = await response.json();
		return json;
	}
	
}