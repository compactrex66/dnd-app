let arrOfCharacterElements = Array.from(document.querySelectorAll(".character"))
let deleteEnemiesBtn = document.getElementById("deleteEnemiesBtn")
let arrOfDeleteBtns = document.querySelectorAll(".deleteBtn")
let arrOfInitiativeInput = document.querySelectorAll("#modifiedInitiativeInput")
let arrOfACInput = document.querySelectorAll("#modifiedACInput")
let arrOfAddHealthBtns = document.querySelectorAll(".addHealthBtn")
let arrOfSubHealthBtns = document.querySelectorAll(".substractHealthBtn")

const actionForm = document.getElementById("actionForm");
const moreInfoPanel = document.getElementById("moreInfoPanel")
const hoursToPassInput = document.getElementById("hoursToPass");

let currentCharacter;
let listOfCharacters = document.getElementById("listOfCharacters");
let actionInput = document.getElementById("actionInput");
let characterIdInput = document.getElementById("characterIdInput");
let healthInput = document.getElementById("healthInput");
let initiativeInput = document.getElementById("initiativeInput");
let ACInput = document.getElementById("ACInput");
let hoursInput = document.getElementById("hoursinput");

function updateCharactersList() {
    let request = new XMLHttpRequest();
    request.onload = () => {        
        listOfCharacters.innerHTML = request.responseText;
        initCurrentCharacter();
        initListeners();
    };
    request.open("post", "indexScript.php", true);
    let formData = new FormData();
    formData.append("action", "getCharacters");
    request.send(formData);
}
function getCurrentCharacter() {
    const arrOfCharacterElements = Array.from(document.querySelectorAll(".character"))
    for(const character of arrOfCharacterElements) {
        if(character.getAttribute("data-current") == 1) {
            return character;
        }
    }
    let request = new XMLHttpRequest();
    request.open('GET', "index.php?action=setCurrent", true);
    request.send();
    return null;
}
function setCurrentCharacter(character) {
    currentCharacter.setAttribute("data-current", "0");
    character.setAttribute("data-current", "1");
    currentCharacter.style.border = "none";
    character.style.border = "1px solid white";
    moreInfoPanel.innerHTML = character.querySelector(".moreInfo")?.innerHTML ?? "Player character";
    let request = new XMLHttpRequest();
    request.open("GET", `index.php?action=setCurrent&characterId=${character.getAttribute("data-characterid")}`, true);
    request.send();
    currentCharacter = character;
}
function initCurrentCharacter() {
    currentCharacter = getCurrentCharacter() ?? arrOfCharacterElements[0];
    setCurrentCharacter(currentCharacter);
}
function initListeners() {
    arrOfCharacterElements = Array.from(document.querySelectorAll(".character"))
    deleteEnemiesBtn = document.getElementById("deleteEnemiesBtn")
    arrOfDeleteBtns = document.querySelectorAll(".deleteBtn")
    arrOfInitiativeInput = document.querySelectorAll("#modifiedInitiativeInput")
    arrOfACInput = document.querySelectorAll("#modifiedACInput")
    arrOfAddHealthBtns = document.querySelectorAll(".addHealthBtn")
    arrOfSubHealthBtns = document.querySelectorAll(".substractHealthBtn")

    //Delete character from combat
    for(let i = 0; i < arrOfDeleteBtns.length; i++) {
        arrOfDeleteBtns[i].addEventListener("click", () => {
            let request = new XMLHttpRequest();
            request.onload = () => {
                updateCharactersList();
            }
            request.open("GET", `index.php?action=delete&characterId=${arrOfDeleteBtns[i].parentNode.getAttribute("data-characterId")}`, true);
            request.send();
            if(arrOfDeleteBtns[i].parentNode.getAttribute("data-current") == 1) {
                setCurrentCharacter(arrOfCharacterElements[arrOfCharacterElements.indexOf(arrOfDeleteBtns[i].parentNode) + 1] ?? arrOfCharacterElements[0]);
            }
        });
    }

    //Modify initiative 
    for(let i = 0; i < arrOfInitiativeInput.length; i++) {
        arrOfInitiativeInput[i].addEventListener("change", () => {
            let request = new XMLHttpRequest();
            request.onload = function() { updateCharactersList(); };
            request.open("GET", `index.php?action=changeInitiative&initiative=${arrOfInitiativeInput[i].value}&characterId=${arrOfInitiativeInput[i].parentNode.parentNode.getAttribute("data-characterId")}`, true);
            request.send();
        });
    }

    //Change AC
    for(let i = 0; i < arrOfACInput.length; i++) {
        arrOfACInput[i].addEventListener("change", () => {
            let request = new XMLHttpRequest();
            request.onload = function() { updateCharactersList(); };
            request.open("GET", `index.php?action=changeAC&AC=${arrOfACInput[i].value}&characterId=${arrOfACInput[i].parentNode.parentNode.getAttribute("data-characterId")}`);
            request.send();
        });
    }

    //Add Health
    for(let i = 0; i < arrOfAddHealthBtns.length; i++) {
        arrOfAddHealthBtns[i].addEventListener("click", () => {
            actionInput.value = "adjustHealth";
            characterIdInput.value = arrOfAddHealthBtns[i].parentNode.parentNode.getAttribute("data-characterId");
            healthInput.value = arrOfAddHealthBtns[i].previousElementSibling.value;
            actionForm.submit(); 
        });
    }

    //Substract health
    for(let i = 0; i < arrOfSubHealthBtns.length; i++) {
        arrOfSubHealthBtns[i].addEventListener("click", () => {
            actionInput.value = "adjustHealth";
            characterIdInput.value = arrOfSubHealthBtns[i].parentNode.parentNode.getAttribute("data-characterId");
            healthInput.value = arrOfSubHealthBtns[i].nextElementSibling.value * (-1);
            actionForm.submit();
        });
    }

    //Change current character to double clicked one | show more info from clicked character
    for(let i = 0; i < arrOfCharacterElements.length; i++) {
        arrOfCharacterElements[i].addEventListener("dblclick", () => {
            setCurrentCharacter(arrOfCharacterElements[i]);
        })
        arrOfCharacterElements[i].addEventListener("click", () => {
            let moreInfo = arrOfCharacterElements[i].querySelector(".moreInfo");
            moreInfoPanel.innerHTML = moreInfo == null ? "Player Character" : moreInfo.innerHTML;
        });
    }

    //Delete all enemies
    deleteEnemiesBtn.addEventListener("click", () => {
        actionInput.value = "deleteAllEnemies";
        if(confirm('Are you sure you want delete all enemies ?'))
            actionForm.submit();
    });

    //Rewind time
    document.getElementById("rewindTimeBtn").addEventListener("click", () => {
        hoursInput.value = hoursToPassInput.value*-1;
        actionInput.value = "passTime";
        actionForm.submit();
    });

    //Pass time
    document.getElementById("forwardTimeBtn").addEventListener("click", () => {
        hoursInput.value = hoursToPassInput.value;
        actionInput.value = "passTime";
        actionForm.submit();
    });

    //Stop propagation
    document.querySelectorAll(".character > *").forEach(function(child) {
        child.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    })

    //Pass time by 2 hours
    document.getElementById("shortRestBtn").addEventListener("click", () => {
        actionInput.value = 'shortRest';
        actionForm.submit();
    });

    //Pass time by 8 hours
    document.getElementById("longRestBtn").addEventListener("click", () => {
        actionInput.value = 'longRest';
        actionForm.submit();
    });
}
initCurrentCharacter();
initListeners();


//Next turn on space click
window.addEventListener("keydown", function(e) {
    if(e.key == " ") {
        let nextCharacter;
        if(arrOfCharacterElements.indexOf(currentCharacter) + 1 >= arrOfCharacterElements.length) {
            nextCharacter = arrOfCharacterElements[0];
        } else {
            nextCharacter = arrOfCharacterElements[arrOfCharacterElements.indexOf(currentCharacter) + 1];
        }
        setCurrentCharacter(nextCharacter)
    }
});