const actionForm = document.getElementById("actionForm");
const moreInfoPanel = document.getElementById("moreInfoPanel");
const hoursToPassInput = document.getElementById("hoursToPass");
const timeElement = document.getElementById("time");
const listOfCharacters = document.getElementById("listOfCharacters");
const hoursInput = document.getElementById("hoursInput");
const deleteEnemiesBtn = document.getElementById("deleteEnemiesBtn");
const addEnemyBtn = document.getElementById("addEnemyBtn");
const enemySelect = document.getElementById("enemySelect");
const enemyQuantity = document.getElementById("enemyQuantity");

let arrOfCharacterElements = Array.from(document.querySelectorAll(".character"));
let currentCharacter;

function updateCharactersList() {
    let request = new XMLHttpRequest();
    request.onload = () => {        
        listOfCharacters.innerHTML = request.responseText;
        arrOfCharacterElements = Array.from(document.querySelectorAll(".character"));
        setCurrentCharacter();
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
    return null;
}
function setCurrentCharacter(character) {
    currentCharacter = getCurrentCharacter() ?? arrOfCharacterElements[0];
    currentCharacter.setAttribute("data-current", "0");
    if(character == undefined) {
        character = currentCharacter;
    }
    character.setAttribute("data-current", "1");
    currentCharacter.style.border = "none";
    character.style.border = "1px solid white";
    moreInfoPanel.innerHTML = character.querySelector(".moreInfo")?.innerHTML ?? `<div class="container"><h1>Player Character</h1></div>`;
    let request = new XMLHttpRequest();
    request.open("post", `indexScript.php`, true);
    let data = new FormData();
    data.append("action", "setCurrent");
    data.append("characterId", character.getAttribute("data-characterid"));
    request.send(data);
    currentCharacter = character;
}

listOfCharacters.addEventListener("click", (e) => {
    const target = e.target;

    // Delete button
    if (target.classList.contains("deleteBtn")) {
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", "indexScript.php", true);
        let data = new FormData();
        data.append("action", "delete");
        data.append("characterId", target.parentNode.getAttribute("data-characterId"));
        request.send(data);
    }

    // Add health button
    if (target.classList.contains("addHealthBtn")) {
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", "indexScript.php", true);
        let data = new FormData();
        data.append("action", "adjustHealth");
        data.append("characterId", target.parentNode.parentNode.getAttribute("data-characterId"));
        data.append("healthNumber", target.previousSibling.value);
        request.send(data);
    }

    //Substract health button
    if(target.classList.contains("substractHealthBtn")) {
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", `indexScript.php`, true);
        let data = new FormData();
        data.append("action", "adjustHealth");
        data.append("characterId", target.parentNode.parentNode.getAttribute("data-characterId"));
        data.append("healthNumber", target.nextSibling.value * -1);            
        request.send(data);
    }

    //change more info in the panel
    if(target.classList.contains("character")) {
        let moreInfo = target.querySelector(".moreInfo");
        moreInfoPanel.innerHTML = moreInfo == null ? "Player Character" : moreInfo.innerHTML;
    }
});

// Handle input changes
listOfCharacters.addEventListener("change", (e) => {
    const target = e.target;

    //initaitive
    if (target.id === "modifiedInitiativeInput") {
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", "indexScript.php", true);
        let data = new FormData();
        data.append("action", "changeInitiative");
        data.append("initiative", target.value);
        data.append("characterId", target.parentNode.parentNode.getAttribute("data-characterId"));
        request.send(data);
    }

    //armor class
    if(target.id == "modifiedACInput") {
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", `indexScript.php`);
        let data = new FormData();
        data.append("action", "changeAC")
        data.append("AC", target.value)
        data.append("characterId", target.parentNode.parentNode.getAttribute("data-characterId"))
        request.send(data);
    }
});

listOfCharacters.addEventListener("dblclick", (e) => {
    if(e.target.classList.contains("character")) {
        setCurrentCharacter(e.target);
    }
})

deleteEnemiesBtn.addEventListener("click", () => {
    if(confirm('Are you sure you want delete all enemies ?')) {
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", "indexScript.php");
        let data = new FormData();
        data.append("action", "deleteAllEnemies");
        request.send(data);
    }
});

//Add enemy
addEnemyBtn.addEventListener("click", () => {
    let data = new FormData();
    data.append("action", "addEnemy");
    data.append("enemyType", enemySelect.value);
    data.append("enemyQuantity", enemyQuantity.value);
    let request = new XMLHttpRequest();
    request.onload = function() { updateCharactersList(); };
    request.open("post", "indexScript.php", true);
    request.send(data);
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

updateCharactersList();