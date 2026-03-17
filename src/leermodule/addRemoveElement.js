document.getElementById("addQuestion")?.addEventListener("click", addQuestion);
document.getElementById("removeQuestion")?.addEventListener("click", removeQuestion);
document.getElementById("addAnswer")?.addEventListener("click", addAnswer);
document.getElementById("removeAnswer")?.addEventListener("click", removeAnswer);

function addQuestion(){
    const semiParentDiv = document.createElement("div");
    const numberingP = document.createElement("p");
    const questionElement = document.createElement("input");

    semiParentDiv.appendChild(numberingP)
    semiParentDiv.appendChild(questionElement)

    const parentDiv = document.getElementById("questionsContainerCreate")
    document.body.insertBefore(semiParentDiv, parentDiv);
}

function removeQuestion() {

}

function addAnswer(){

}

function removeAnswer(){

}