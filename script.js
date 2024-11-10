let actionForm = document.getElementById("actionForm")
let actionInput = document.getElementById("actionInput")
let characterIdInput = document.getElementById("characterIdInput")
let healthInput = document.getElementById("healthInput")
let initiativeInput = document.getElementById("initiativeInput")

function formatMoreInfoString(string) {
    string = string.replace("STR 	DEX 	CON 	INT 	WIS 	CHA", `<table><tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr></table>`);
    string = string.replace("Skills", "<br>Skills")
    string = string.replace("Challenge", "<br>Challenge")
    string = string.replace("Actions", "<br>Actions")
    string = string.replace("Senses", "<br>Senses")
    string = string.replace("Languages", "<br>Languages")

    return string;
}

let arrOfDeleteBtns = document.querySelectorAll(".deleteBtn")
for(let i = 0; i < arrOfDeleteBtns.length; i++) {
    arrOfDeleteBtns[i].addEventListener("click", () => {
        actionInput.value = "delete"
        characterIdInput.value = arrOfDeleteBtns[i].parentNode.getAttribute("data-characterId");
        actionForm.submit();
    });
}

let arrOfInitiativeInput = document.querySelectorAll("#modifiedInitiativeInput")
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

let deleteEnemiesBtn = document.getElementById("deleteEnemiesBtn")
deleteEnemiesBtn.addEventListener("click", () => {
    actionInput.value = "deleteAllEnemies";
    if(confirm('Are you sure you want delete all enemies ?'))
        actionForm.submit();
});

let arrOfCharacterElements = document.querySelectorAll(".character")
let moreInfoElement = document.getElementById("moreInfo")
for(let i = 0; i < arrOfCharacterElements.length; i++) {
    arrOfCharacterElements[i].addEventListener("click", () => {
        let moreInfo = arrOfCharacterElements[i].querySelector(".moreInfo").innerText;
        moreInfo = formatMoreInfoString(moreInfo)

        moreInfoElement.innerText = moreInfo
        moreInfoElement.style.zIndex = 1;
        moreInfoElement.animate(
            { opacity: 1 },
            { fill: "forwards", duration: 125}
        )
    });
}