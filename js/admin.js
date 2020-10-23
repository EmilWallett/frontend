var webbServerIp = "http://its.teknikum.it:9000/", serverPath = "sustaining_backend/api/";
var webbServerAdress = webbServerIp + serverPath;

let user = {
	isSignedIn : function() {
		return false;
	}
};

function onSignIn(googleUser) {
	user = googleUser;
	LoadPosts();
}

async function LoadPosts() {
	try {
		let postIDs = await RequestPostsID(100);
		let users = await RequsetUsers(50);

		let postTableBody = document.getElementById("postAdminBody");
		let userTableBody = document.getElementById("userAdminBody");

		postTableBody.innerHTML = "";
		userTableBody.innerHTML = "";

		for (let index = 0; index < users.length; index++) {
			const element = users[index];
			let rowElement = GenerateUserRow(element);
			userTableBody.appendChild(rowElement);
		}

		for (let index = 0; index < postIDs.length; index++) {
			const element = postIDs[index];
			let data = await RequestPost(element);
			let rowElement = GeneratePostRow(data);
			postTableBody.appendChild(rowElement);
		}
	} catch (error) {
		window.location.pathname = "index.html";
	}
	
}

async function ReloadPosts(){
	let postIDs = await RequestPostsID(10);
	let users = await RequsetUsers(10);

	let postTableBody = document.getElementById("postAdminBody");
	let userTableBody = document.getElementById("userAdminBody");

	postTableBody.innerHTML = "";
	userTableBody.innerHTML = "";
	
	for (let index = 0; index < users.length; index++) {
		const element = users[index];
		let rowElement = GenerateUserRow(element);
		userTableBody.appendChild(rowElement);
	}

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

async function RequsetUsers(amount){
	let token = user.getAuthResponse().id_token;
	let response = await fetch(webbServerAdress + "admin/users/" + amount, {
		headers: {
			"Authorization": token
		},
		method: "GET"
	});
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

async function DeletePost(postID) {
	let token = user.getAuthResponse().id_token;
	let response = await fetch(webbServerAdress + "admin/image/" + postID, {
		headers: {
			"Authorization": token
		},
		method: "DELETE"
	});
	ReloadPosts();
}


function GenerateUserRow(user){
	let rowElement = document.createElement("tr");

	let userElement = document.createElement("td");
	let userText = document.createTextNode(user.username);
	userElement.appendChild(userText);
	rowElement.appendChild(userElement);

	let buttonRowElement = document.createElement("td");
	let deleteButtonElement = document.createElement("button");
	let deleteButtonText = document.createTextNode("Delete");
	deleteButtonElement.appendChild(deleteButtonText);
	deleteButtonElement.classList.add("deleteButton");
	deleteButtonElement.classList.add("is-danger");
	deleteButtonElement.setAttribute("onclick", "DeleteUser(" + user.id +");");
	buttonRowElement.appendChild(deleteButtonElement);
	rowElement.appendChild(buttonRowElement);
	
	return rowElement;
}

async function DeleteUser(userID){
	let token = user.getAuthResponse().id_token;
	let response = await fetch(webbServerAdress + "admin/user/" + userID, {
		headers: {
			"Authorization": token
		},
		method: "DELETE"
	});
	ReloadPosts();
}