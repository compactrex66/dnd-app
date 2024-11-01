let arrOfDeleteBtns = document.querySelectorAll(".deleteBtn")
let actionForm = document.getElementById("actionForm")
let actionInput = document.getElementById("actionInput")
let characterIdInput = document.getElementById("characterIdInput")
let healthInput = document.getElementById("healthInput")
let initiativeInput = document.getElementById("initiativeInput")
let arrOfInitiativeInput = document.querySelectorAll("#modifiedInitiativeInput")

for(let i = 0; i < arrOfDeleteBtns.length; i++) {
    arrOfDeleteBtns[i].addEventListener("click", () => {
        actionInput.value = "delete"
        characterIdInput.value = arrOfDeleteBtns[i].parentNode.getAttribute("data-characterId");
        actionForm.submit();
    });
}

for(let i = 0; i < arrOfInitiativeInput.length; i++) {
    arrOfInitiativeInput[i].addEventListener("change", () => {
        actionInput.value = "changeInitiative";
        characterIdInput.value = arrOfInitiativeInput[i].parentNode.getAttribute("data-characterId");
        initiativeInput.value = arrOfInitiativeInput[i].value
        actionForm.submit();
    });
}

let arrOfAddHealthBtns = document.querySelectorAll(".greenBtn")

for(let i = 0; i < arrOfAddHealthBtns.length; i++) {
    arrOfAddHealthBtns[i].addEventListener("click", () => {
        actionInput.value = "adjustHealth";
        characterIdInput.value = arrOfAddHealthBtns[i].parentNode.getAttribute("data-characterId");
        healthInput.value = arrOfAddHealthBtns[i].previousElementSibling.value;
        actionForm.submit();
    });
}

let arrOfSubHealthBtns = document.querySelectorAll(".redBtn")

for(let i = 0; i < arrOfSubHealthBtns.length; i++) {
    arrOfSubHealthBtns[i].addEventListener("click", () => {
        actionInput.value = "adjustHealth";
        characterIdInput.value = arrOfSubHealthBtns[i].parentNode.getAttribute("data-characterId");
        healthInput.value = arrOfSubHealthBtns[i].nextElementSibling.value * (-1);
        actionForm.submit();
    });
}