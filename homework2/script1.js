function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function selected() {
    var x = document.getElementById("home");
    if (x.className === "inactive") {
        x.className = " active";
    } else {
        x.className = "inactive";
    }
}