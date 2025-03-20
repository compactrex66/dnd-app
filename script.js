const actionForm = document.getElementById("actionForm");
const moreInfoPanel = document.getElementById("moreInfoPanel");
const hoursToPassInput = document.getElementById("hoursToPass");
const timeElement = document.getElementById("time");
const listOfCharacters = document.getElementById("listOfCharacters");
const hoursInput = document.getElementById("hoursInput");

let arrOfCharacterElements = Array.from(document.querySelectorAll(".character"));
let deleteEnemiesBtn = document.getElementById("deleteEnemiesBtn");
let arrOfDeleteBtns = document.querySelectorAll(".deleteBtn");
let arrOfInitiativeInput = document.querySelectorAll("#modifiedInitiativeInput");
let arrOfACInput = document.querySelectorAll("#modifiedACInput");
let arrOfAddHealthBtns = document.querySelectorAll(".addHealthBtn");
let arrOfSubHealthBtns = document.querySelectorAll(".substractHealthBtn");
let currentCharacter;

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
function updateTime() {
    let request = new XMLHttpRequest();
    request.onload = function() { timeElement.innerHTML = this.responseText };
    request.open("post", "indexScript.php");
    let data = new FormData();
    data.append("action", "getDate");
    request.send(data);
}
function getCurrentCharacter() {
    const arrOfCharacterElements = Array.from(document.querySelectorAll(".character"))
    for(const character of arrOfCharacterElements) {
        if(character.getAttribute("data-current") == 1) {
            return character;
        }
    }
    let request = new XMLHttpRequest();
    request.open('post', "indexScript.php", true);
    let data = new FormData();
    data.append("action", "setCurrent");
    request.send(data);
    return null;
}
function setCurrentCharacter(character) {
    currentCharacter.setAttribute("data-current", "0");
    character.setAttribute("data-current", "1");
    currentCharacter.style.border = "none";
    character.style.border = "1px solid white";
    moreInfoPanel.innerHTML = character.querySelector(".moreInfo")?.innerHTML ?? "Player character";
    let request = new XMLHttpRequest();
    request.open("post", `indexScript.php`, true);
    let data = new FormData();
    data.append("action", "setCurrent");
    data.append("characterId", character.getAttribute("data-characterid"));
    request.send(data);
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
            request.onload = function() { updateCharactersList(); }
            request.open("post", `indexScript.php`, true);
            let data = new FormData();
            data.append("action", "delete");
            data.append("characterId", arrOfDeleteBtns[i].parentNode.getAttribute("data-characterId"));
            request.send(data);
            if(arrOfDeleteBtns[i].parentNode.getAttribute("data-current") == 1) {
                setCurrentCharacter(arrOfCharacterElements[arrOfCharacterElements.indexOf(arrOfDeleteBtns[i].parentNode) + 1] ?? arrOfCharacterElements[0]);
            }
            arrOfDeleteBtns[i].parentNode.remove();
        });
    }

    //Modify initiative 
    for(let i = 0; i < arrOfInitiativeInput.length; i++) {
        arrOfInitiativeInput[i].addEventListener("change", () => {
            let request = new XMLHttpRequest();
            request.onload = function() { updateCharactersList(); };
            request.open("post", `indexScript.php`, true);
            let data = new FormData();
            data.append("action", "changeInitiative");
            data.append("initiative", arrOfInitiativeInput[i].value);
            data.append("characterId", arrOfInitiativeInput[i].parentNode.parentNode.getAttribute("data-characterId"));
            request.send(data);
        });
    }

    //Change AC
    for(let i = 0; i < arrOfACInput.length; i++) {
        arrOfACInput[i].addEventListener("change", () => {
            let request = new XMLHttpRequest();
            request.onload = function() { updateCharactersList(); };
            request.open("post", `indexScript.php`);
            let data = new FormData();
            data.append("action", "changeAC")
            data.append("AC", arrOfACInput[i].value)
            data.append("characterId", arrOfACInput[i].parentNode.parentNode.getAttribute("data-characterId"))
            request.send(data);
        });
    }

    //Add Health
    for(let i = 0; i < arrOfAddHealthBtns.length; i++) {
        arrOfAddHealthBtns[i].addEventListener("click", () => {
            let request = new XMLHttpRequest();
            request.onload = function() { updateCharactersList() };
            request.open("post", `indexScript.php`, true);
            let data = new FormData();
            data.append("action", "adjustHealth");
            data.append("characterId", arrOfAddHealthBtns[i].parentNode.parentNode.getAttribute("data-characterId"));
            data.append("healthNumber", arrOfAddHealthBtns[i].previousSibling.value);
            request.send(data);
        });
    }

    //Substract health
    for(let i = 0; i < arrOfSubHealthBtns.length; i++) {
        arrOfSubHealthBtns[i].addEventListener("click", () => {
            let request = new XMLHttpRequest();
            request.onload = function() { updateCharactersList(); };
            request.open("post", `indexScript.php`, true);
            let data = new FormData();
            data.append("action", "adjustHealth");
            data.append("characterId", arrOfSubHealthBtns[i].parentNode.parentNode.getAttribute("data-characterId"));
            data.append("healthNumber", arrOfSubHealthBtns[i].nextSibling.value * -1);            
            request.send(data);
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
        if(confirm('Are you sure you want delete all enemies ?')) {
            let request = new XMLHttpRequest();
            request.onload = function() { updateCharactersList(); setCurrentCharacter(); };
            request.open("post", "indexScript.php");
            let data = new FormData();
            data.append("action", "deleteAllEnemies");
            request.send(data);
        }
    });

    //Rewind time
    document.getElementById("rewindTimeBtn").addEventListener("click", () => {
        let request = new XMLHttpRequest();
        request.onload = function() { updateTime(); };
        request.open("post", "indexScript.php");
        let data = new FormData();
        data.append("action", "passTime");
        data.append("hoursToPass", hoursInput.value*-1);
        request.send(data);
    });

    //Pass time
    document.getElementById("forwardTimeBtn").addEventListener("click", () => {
        let request = new XMLHttpRequest();
        request.onload = function() { updateTime(); };
        request.open("post", "indexScript.php");
        let data = new FormData();
        data.append("action", "passTime");
        data.append("hoursToPass", hoursInput.value);
        request.send(data);
    });

    //Pass time by 2 hours
    document.getElementById("shortRestBtn").addEventListener("click", () => {
        let request = new XMLHttpRequest();
        request.onload = function() { updateTime(); };
        request.open("post", "indexScript.php");
        let data = new FormData();
        data.append("action", "shortRest");
        request.send(data);
    });

    //Pass time by 8 hours
    document.getElementById("longRestBtn").addEventListener("click", () => {
        let request = new XMLHttpRequest();
        request.onload = function() { updateTime(); };
        request.open("post", "indexScript.php");
        let data = new FormData();
        data.append("action", "longRest");
        request.send(data);
    });

    //Stop propagation
    document.querySelectorAll(".character > *").forEach(function(child) {
        child.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    })
}
initCurrentCharacter();
initListeners();
updateCharactersList();

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