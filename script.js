const actionForm = document.getElementById("actionForm");
let actionInput = document.getElementById("actionInput");
let characterIdInput = document.getElementById("characterIdInput");
let healthInput = document.getElementById("healthInput");
let initiativeInput = document.getElementById("initiativeInput");
let ACInput = document.getElementById("ACInput");
let hoursInput = document.getElementById("hoursinput");

function getCurrentCharacter(charactersArr) {
    for(const character of charactersArr) {
        if(character.getAttribute("data-current") == 1) {
            return character;
        }
    }
    actionInput.value = "setCurrent";
    actionForm.submit();
}

const arrOfDeleteBtns = document.querySelectorAll(".deleteBtn")
for(let i = 0; i < arrOfDeleteBtns.length; i++) {
    arrOfDeleteBtns[i].addEventListener("click", () => {
        actionInput.value = "delete";
        characterIdInput.value = arrOfDeleteBtns[i].parentNode.getAttribute("data-characterId");
        actionForm.submit();
    });
}

const arrOfInitiativeInput = document.querySelectorAll("#modifiedInitiativeInput")
for(let i = 0; i < arrOfInitiativeInput.length; i++) {
    arrOfInitiativeInput[i].addEventListener("change", () => {
        actionInput.value = "changeInitiative";
        characterIdInput.value = arrOfInitiativeInput[i].parentNode.parentNode.getAttribute("data-characterId");
        initiativeInput.value = arrOfInitiativeInput[i].value;
        actionForm.submit();
    });
}

const arrOfACInput = document.querySelectorAll("#modifiedACInput")
for(let i = 0; i < arrOfACInput.length; i++) {
    arrOfACInput[i].addEventListener("change", () => {
        actionInput.value = "changeAC";
        characterIdInput.value = arrOfACInput[i].parentNode.parentNode.getAttribute("data-characterId");
        ACInput.value = arrOfACInput[i].value;
        actionForm.submit();
    });
}

const arrOfAddHealthBtns = document.querySelectorAll(".addHealthBtn")
for(let i = 0; i < arrOfAddHealthBtns.length; i++) {
    arrOfAddHealthBtns[i].addEventListener("click", () => {
        actionInput.value = "adjustHealth";
        characterIdInput.value = arrOfAddHealthBtns[i].parentNode.parentNode.getAttribute("data-characterId");
        healthInput.value = arrOfAddHealthBtns[i].previousElementSibling.value;
        actionForm.submit(); 
    });
}

const arrOfSubHealthBtns = document.querySelectorAll(".substractHealthBtn")
for(let i = 0; i < arrOfSubHealthBtns.length; i++) {
    arrOfSubHealthBtns[i].addEventListener("click", () => {
        actionInput.value = "adjustHealth";
        characterIdInput.value = arrOfSubHealthBtns[i].parentNode.parentNode.getAttribute("data-characterId");
        healthInput.value = arrOfSubHealthBtns[i].nextElementSibling.value * (-1);
        actionForm.submit();
    });
}

const deleteEnemiesBtn = document.getElementById("deleteEnemiesBtn")
deleteEnemiesBtn.addEventListener("click", () => {
    actionInput.value = "deleteAllEnemies";
    if(confirm('Are you sure you want delete all enemies ?'))
        actionForm.submit();
});

const moreInfoPanel = document.getElementById("moreInfoPanel")
const arrOfCharacterElements = Array.from(document.querySelectorAll(".character"))
for(let i = 0; i < arrOfCharacterElements.length; i++) {
    arrOfCharacterElements[i].addEventListener("dblclick", () => {
        actionInput.value = "setCurrent";
        characterIdInput.value = arrOfCharacterElements[i].getAttribute("data-characterid");
        actionForm.submit();
    })
    arrOfCharacterElements[i].addEventListener("click", () => {
        let moreInfo = arrOfCharacterElements[i].querySelector(".moreInfo").innerHTML;
        moreInfoPanel.innerHTML = moreInfo
    });
}

let currentCharacter = getCurrentCharacter(arrOfCharacterElements) ?? arrOfCharacterElements[0];
currentCharacter.style.border = "1px solid white";
moreInfoPanel.innerHTML = currentCharacter.querySelector(".moreInfo")?.innerHTML ?? "Player character";
window.addEventListener("keydown", function(e) {
    if(e.key == " ") {
        if(arrOfCharacterElements.indexOf(currentCharacter) + 1 >= arrOfCharacterElements.length) {
            currentCharacter = arrOfCharacterElements[0];
        } else {
            currentCharacter = arrOfCharacterElements[arrOfCharacterElements.indexOf(currentCharacter) + 1];
        }
        actionInput.value = "setCurrent";
        characterIdInput.value = currentCharacter.getAttribute("data-characterid");
        actionForm.submit();
    }
});

let hoursToPassInput = document.getElementById("hoursToPass");
document.getElementById("rewindTimeBtn").addEventListener("click", () => {
    hoursInput.value = hoursToPassInput.value*-1;
    actionInput.value = "passTime";
    actionForm.submit();
});
document.getElementById("forwardTimeBtn").addEventListener("click", () => {
    hoursInput.value = hoursToPassInput.value;
    actionInput.value = "passTime";
    actionForm.submit();
});


document.querySelectorAll(".character > *").forEach(function(child) {
    child.addEventListener("click", (e) => {
        e.stopPropagation();
    });
})

document.getElementById("shortRestBtn").addEventListener("click", () => {
    actionInput.value = 'shortRest';
    actionForm.submit();
});

document.getElementById("longRestBtn").addEventListener("click", () => {
    actionInput.value = 'longRest';
    actionForm.submit();
});