 //Image encoding
 function encodeImageFileAsURL() { // <- Function to encode an image or anything else
	 var srcData;
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        srcData = fileLoadedEvent.target.result; // <--- data: base64
        var newImage = document.createElement('img');
        newImage.src = srcData;
        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
 
      }
      fileReader.readAsDataURL(fileToLoad);
	  //let result= postData(srcData);
	  //console.log(result);
	  document.getElementById("upload-btn").onclick = ()=>postData(srcData);
   
  }
 }
  
  async function postData(image){
	  console.log("in postData")
	  let response = await fetch("http://94.46.140.3:8080/sustain_backend/api/image", {
		 headers:{
			 "Accept-Type":"application/json",
			  "Content-Type": "application/json"
		 },
		 method:"POST",
	  body:
		  JSON.stringify ({
		  image: image,
			  user: "",
			  rating: ""
		  })
		  
			});
			return await response.json();
  }