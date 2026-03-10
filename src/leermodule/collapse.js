let coll = document.getElementsByClassName("collapsible");
let i;


for (i = 0; i < coll.length; i++) {
    console.log(coll[i]);
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        console.log(" ")
        if (content.style.display === "block" || content.style.display === "flex") {
            content.style.display = "none";
            console.log(" ")
        } else {
            content.style.display = "block";
            content.style.display = "flex";
            console.log(" ")
        }
    });
}