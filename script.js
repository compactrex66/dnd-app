const actionForm = document.getElementById("actionForm");
const moreInfoPanel = document.getElementById("moreInfoPanel");
const hoursToPassInput = document.getElementById("hoursToPass");
const timeElement = document.getElementById("time");
const listOfCharacters = document.getElementById("listOfCharacters");
const hoursInput = document.getElementById("hoursInput");
const deleteEnemiesBtn = document.getElementById("deleteEnemiesBtn");
const addEnemyBtn = document.getElementById("addEnemyBtn");
const enemySelect = document.getElementById("enemySelect");
const selectedEnemy = document.getElementById("selectedEnemy");
const enemyOptions = document.getElementById("enemyList")
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
    request.open("post", "indexActions.php", true);

    let formData = new FormData();
    formData.append("action", "getCharacters");
    request.send(formData);    
}
function updateTime() {
    let request = new XMLHttpRequest();
    request.onload = function() { timeElement.innerHTML = this.responseText };
    request.open("post", "indexActions.php");

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
function getNextCharacter() {
    if(arrOfCharacterElements.indexOf(currentCharacter) + 1 >= arrOfCharacterElements.length) {
        return arrOfCharacterElements[0];
    } else {
        return arrOfCharacterElements[arrOfCharacterElements.indexOf(currentCharacter) + 1];
    }
}
function getPreviousCharacter() {
    if(arrOfCharacterElements.indexOf(currentCharacter) - 1 < 0) {
        return arrOfCharacterElements[arrOfCharacterElements.length - 1];
    } else {
        return arrOfCharacterElements[arrOfCharacterElements.indexOf(currentCharacter) - 1];
    }
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

    moreInfoPanel.querySelectorAll(".hint-popup").forEach(hintPopup => {
        hintPopup.addEventListener("mouseleave", e => {
            hintPopup.style.display = "none";
        });
    })

    let request = new XMLHttpRequest();
    request.open("post", `indexActions.php`, true);

    let data = new FormData();
    data.append("action", "setCurrent");
    data.append("characterId", character.getAttribute("data-characterid"));
    request.send(data);
    currentCharacter = character;
}

//Handle character clicks
listOfCharacters.addEventListener("click", (e) => {
    let target = e.target;

    // Delete button
    if (target.classList.contains("deleteBtn")) {
        let request = new XMLHttpRequest();
        request.open("post", "indexActions.php", true);

        let data = new FormData();
        data.append("action", "delete");
        data.append("characterId", target.parentNode.getAttribute("data-characterId"));
        if(target.parentNode.getAttribute("data-current") == 1) {
            setCurrentCharacter(getNextCharacter());
        }
        target.parentNode.remove();
        arrOfCharacterElements = Array.from(document.querySelectorAll(".character"))
        request.send(data);
    }

    // Add health button
    if (target.classList.contains("addHealthBtn")) {
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", "indexActions.php", true);

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
        request.open("post", `indexActions.php`, true);

        let data = new FormData();
        data.append("action", "adjustHealth");
        data.append("characterId", target.parentNode.parentNode.getAttribute("data-characterId"));
        data.append("healthNumber", target.nextSibling.value * -1);            
        request.send(data);
    }

    //change more info in the panel
    if(target.classList.contains("character") || target.classList.contains("characterName")) {
        target = target.classList.contains("characterName") ? target.parentNode : target;
        let moreInfo = target.querySelector(".moreInfo");
        moreInfoPanel.innerHTML = moreInfo == null ? `<div class="container"><h1>Player Character</h1></div>` : moreInfo.innerHTML;

        moreInfoPanel.querySelectorAll(".hint-popup").forEach(hintPopup => {
            hintPopup.addEventListener("mouseleave", e => {
                hintPopup.style.display = "none";
            });
        })
    }
});

//Handle clicks outside elements
document.addEventListener("click", e => {
    let target = e.target;
    
    if(!target.classList.contains("option") && !target.classList.contains("options") && !target.classList.contains("select") && target.id != "selectedEnemy" && enemyOptions.style.display != "none") {
        let fadeOutAnimation = enemyOptions.animate(
            [
                { opacity: 0 }
            ],
            selectAnimOptions
        )
        fadeOutAnimation.onfinish = () => { enemyOptions.style.display = "none"; }
    }
    
    if(!target.classList.contains("side-panel") && !target.parentNode.classList.contains("side-panel") && !target.parentNode.parentNode.classList.contains("side-panel") && target.id != "menuIcon") {
        hideSidePanelMenu();
    }
});

//handle mouseover spell to show spell hint
moreInfoPanel.addEventListener("mouseover", e => {
    let target = e.target;
    if(target.classList.contains("spell")) {
        let popup = target.querySelector(".hint-popup");
        popup.style.display = "inline-block";

        let rect = popup.getBoundingClientRect();
        console.log(rect.right + " " + rect.left + " " + rect.width + " | " + window.innerWidth);
        
        if (rect.right+10 > window.innerWidth) {
            popup.style.left = `${window.innerWidth - (rect.right) - 30}px`;
        }
    }
})

//Handle input changes
listOfCharacters.addEventListener("change", (e) => {
    const target = e.target;

    //initaitive
    if (target.id === "modifiedInitiativeInput") {
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", "indexActions.php", true);

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
        request.open("post", `indexActions.php`);

        let data = new FormData();
        data.append("action", "changeAC")
        data.append("AC", target.value)
        data.append("characterId", target.parentNode.parentNode.getAttribute("data-characterId"))
        request.send(data);
    }
});

//Handle character double clicks
listOfCharacters.addEventListener("dblclick", (e) => {
    const target = e.target

    if(target.classList.contains("character")) {
        setCurrentCharacter(e.target);
    }

    if(target.classList.contains("characterName")) {
        let inputNewNameElement = document.createElement("textarea"), oldName = target.innerText;
        inputNewNameElement.value = target.innerText;
        inputNewNameElement.classList.add("newCharacterName");
        inputNewNameElement.addEventListener("focusout", () => {
            if(inputNewNameElement.value != oldName) {
                let data = new FormData();
                data.append("action", "changeCharacterName");
                data.append("newName", inputNewNameElement.value)
                data.append("characterId", target.parentNode.getAttribute("data-characterId"))

                let request = new XMLHttpRequest();
                request.onload = function() { updateCharactersList(); };
                request.open("post", "indexActions.php", true);
                request.send(data);
            } else {
                target.innerHTML = oldName;
            }
        });

        target.innerHTML = "";
        target.appendChild(inputNewNameElement);
        inputNewNameElement.focus();
    }
})

//Delete all enemies
deleteEnemiesBtn.addEventListener("click", () => {
    if(confirm('Are you sure you want delete all enemies ?')) {
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", "indexActions.php");

        let data = new FormData();
        data.append("action", "deleteAllEnemies");
        request.send(data);
    }
    deleteEnemiesBtn.blur();
});

//Add enemy
addEnemyBtn.addEventListener("click", () => {
    let data = new FormData();
    data.append("action", "addEnemy");
    data.append("enemyType", selectedEnemy.innerText);
    data.append("enemyQuantity", enemyQuantity.value);

    let request = new XMLHttpRequest();
    request.onload = function() { updateCharactersList(); };
    request.open("post", "indexActions.php", true);
    request.send(data);

    addEnemyBtn.blur();
});

//Rewind time
document.getElementById("rewindTimeBtn").addEventListener("click", () => {
    let request = new XMLHttpRequest();
    request.onload = function() { updateTime(); };
    request.open("post", "indexActions.php");

    let data = new FormData();
    data.append("action", "passTime");
    data.append("hoursToPass", hoursInput.value*-1);
    request.send(data);

    document.getElementById("rewindTimeBtn").blur();
});

//Pass time
document.getElementById("forwardTimeBtn").addEventListener("click", () => {
    let request = new XMLHttpRequest();
    request.onload = function() { updateTime(); };
    request.open("post", "indexActions.php");

    let data = new FormData();
    data.append("action", "passTime");
    data.append("hoursToPass", hoursInput.value);
    request.send(data);

    document.getElementById("forwardTimeBtn").blur();
});

//Pass time by 2 hours
document.getElementById("shortRestBtn").addEventListener("click", () => {
    let request = new XMLHttpRequest();
    request.onload = function() { updateTime(); };
    request.open("post", "indexActions.php");

    let data = new FormData();
    data.append("action", "shortRest");
    request.send(data);

    document.getElementById("shortRestBtn").blur()
});

//Pass time by 8 hours
document.getElementById("longRestBtn").addEventListener("click", () => {
    let request = new XMLHttpRequest();
    request.onload = function() { updateTime(); };
    request.open("post", "indexActions.php");

    let data = new FormData();
    data.append("action", "longRest");
    request.send(data);

    document.getElementById("longRestBtn").blur()
});

//Next turn on space click or previous turn on shift + space
window.addEventListener("keydown", function(e) {
    if(e.key == " ") {
        if(!e.shiftKey) setCurrentCharacter(getNextCharacter());
        else setCurrentCharacter(getPreviousCharacter());
    }
});

let selectAnimOptions = {
    duration: 300,
    fill: "forwards",
    easing: "cubic-bezier(0,.73,.17,1.11)",
}
//Toggle enemy list visibility: 
enemySelect.addEventListener("click", () => {    
    if(enemyOptions.style.display != "grid") {
        enemyOptions.style.display = "grid";
        enemyOptions.animate(
            [
                { opacity: 1 }
            ],
            selectAnimOptions
        )
    }
    else {
        let fadeOutAnimation = enemyOptions.animate(
            [
                { opacity: 0 }
            ],
            selectAnimOptions
        )
        fadeOutAnimation.onfinish = () => { enemyOptions.style.display = "none"; }
    }
});

//Change selected enemy
enemyOptions.addEventListener("click", (e) => {
    e.stopPropagation();
    if(e.target.classList.contains("option")) {
        selectedEnemy.innerText = e.target.innerText;            
        enemyOptions.style.display = "none"
    }
});

updateCharactersList();