function toggleBurger() {
    var x = document.getElementById("myLinks");
    console.log(x)
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }