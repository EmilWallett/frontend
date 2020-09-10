var webbServerIp = "http://its.teknikum.it:9000/", serverPath = "sustaining_backend/api/";
var webbServerAdress = webbServerIp + serverPath;


async function LoadPosts() {
	let postIDs = await RequestPostsID(10);
	console.log(postIDs);

	let postTableBody = document.getElementById("postAdminBody");

	for (let index = 0; index < postIDs.length; index++) {
		const element = postIDs[index];
		let data = await RequestPost(element);
		let rowElement = GeneratePostRow(data);
		postTableBody.appendChild(rowElement);
	}

	

}

async function RequestPost(postID){
	let response = await fetch(webbServerAdress + "post/id/" + postID);
	let json = await response.json();
	return json;
}

async function RequestPostsID(amount){
	let response = await fetch(webbServerAdress + "postsid/all/" + amount);
	let json = await response.json();
	return json;
}

function GeneratePostRow(post) {
	let rowElement = document.createElement("tr");

	let titleElement = document.createElement("td");
	let titleText = document.createTextNode(post.image.title);
	titleElement.appendChild(titleText);
	rowElement.appendChild(titleElement);

	let userElement = document.createElement("td");
	let userText = document.createTextNode(post.image.username);
	userElement.appendChild(userText);
	rowElement.appendChild(userElement);

	let imageRowElement = document.createElement("td");
	let imageElement = document.createElement("img");
	imageElement.src = post.image.image;
	imageElement.alt = post.image.title;
	imageRowElement.appendChild(imageElement);
	rowElement.appendChild(imageRowElement);

	let buttonRowElement = document.createElement("td");
	let deleteButtonElement = document.createElement("button");
	let deleteButtonText = document.createTextNode("Delete");
	deleteButtonElement.appendChild(deleteButtonText);
	deleteButtonElement.classList.add("deleteButton");
	deleteButtonElement.classList.add("is-danger");
	deleteButtonElement.setAttribute("onclick", "DeletePost(" + post.image.id +");");
	buttonRowElement.appendChild(deleteButtonElement);
	rowElement.appendChild(buttonRowElement);

	return rowElement;
}

function DeletePost(postID) {
	console.log(postID);
}

LoadPosts();