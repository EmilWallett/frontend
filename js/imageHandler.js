var webbServerIp = "http://its.teknikum.it:9000/", serverPath = "sustaining_backend/api/";
var webbServerAdress = webbServerIp + serverPath;



async function  setAllFameImages() {

    var fameImages = document.getElementsByClassName('fameImgJS');
    var posts = await RequestFameImages(fameImages.length);

    for (var i = 0; i < fameImages.length; i++)
    {
        fameImages[i].src = posts[i].image.image;
        fameImages[i].alt = posts[i].image.title;
    }
}

async function setAllShameImages() {

    var shameImages = document.getElementsByClassName('shameImgJS');
    var posts = await RequestShameImages(shameImages.length);

    for (var i = 0; i < shameImages.length; i++)
    {
        shameImages[i].src = posts[i].image.image;
        shameImages[i].alt = posts[i].image.title;
    }
}

async function RequestShameImages(numberOfImages) {
    const response = await fetch(webbServerAdress + "posts/shame/" + numberOfImages);
    const json = await response.json();
    return json;
}
    
async function RequestFameImages(numberOfImages) {
    const response = await fetch(webbServerAdress + "posts/fame/" + numberOfImages);
    const json = await response.json();
    return json;
}


setAllFameImages();
setAllShameImages();
