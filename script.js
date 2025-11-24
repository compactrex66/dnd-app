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
const enemyOptions = document.getElementById("enemyList");
const enemyQuantity = document.getElementById("enemyQuantity");
const resetTurnCounterBtn = document.getElementById("resetTurnCounter");
const turnCounter = document.getElementById("turnCounter");

let arrOfCharacterElements = Array.from(document.querySelectorAll(".character"));
let currentCharacter, isEditing = false;

async function updateCharactersList() {
    await new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.onload = () => {                
            listOfCharacters.innerHTML = request.responseText;
            arrOfCharacterElements = Array.from(document.querySelectorAll(".character"));
            currentCharacter = getCurrentCharacter();
            resolve();
        };
        request.open("post", "indexActions.php", true);
        
        let formData = new FormData();
        formData.append("action", "getCharacters");
        request.send(formData);    
    })
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
    return arrOfCharacterElements[0];
}
function getNextCharacter() {
    console.log(arrOfCharacterElements);
    
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
function setCurrentCharacter(character, isNextTurn) {
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
    request.onload = updateCharactersList;
    request.open("post", `indexActions.php`, true);

    let data = new FormData();
    data.append("action", "setCurrent");
    data.append("characterId", character.getAttribute("data-characterid"));
    data.append("nextTurn", isNextTurn);
    request.send(data);
    currentCharacter = character;
}
function updateTurnCounter() {
    let request = new XMLHttpRequest();
    request.open("post", "indexActions.php");
    request.onload = () => {
        turnCounter.innerHTML = request.responseText;
    }
    let data = new FormData();
    data.append("action", "getTurnCounter");
    request.send(data);
}
function incrementTurnCounter() {
    let request = new XMLHttpRequest();
    request.open("post", "indexActions.php");
    request.onload = updateTurnCounter;
    let data = new FormData();
    data.append("action", "incrementTurnCounter");
    request.send(data);
}
function decrementTurnCounter() {
    let request = new XMLHttpRequest();
    request.open("post", "indexActions.php");
    request.onload = updateTurnCounter;
    let data = new FormData();
    data.append("action", "decrementTurnCounter");
    request.send(data);
}

//Handle character clicks
listOfCharacters.addEventListener("click", (e) => {
    let target = e.target;
    console.log(target);
    

    // Delete button
    if (target.classList.contains("deleteBtn")) {
        let characterAncestor = target.closest(".character");
        let request = new XMLHttpRequest();
        request.open("post", "indexActions.php", true);

        let data = new FormData();
        data.append("action", "delete");
        data.append("characterId", characterAncestor.getAttribute("data-characterId"));
        if(characterAncestor.getAttribute("data-current") == 1) {
            setCurrentCharacter(getNextCharacter(), true);
        }
        characterAncestor.remove();
        arrOfCharacterElements = Array.from(document.querySelectorAll(".character"))
        request.send(data);
    }

    // Add health button
    if (target.classList.contains("addHealthBtn")) {
        let characterAncestor = target.closest(".character");
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", "indexActions.php", true);

        let data = new FormData();
        data.append("action", "adjustHealth");
        data.append("characterId", characterAncestor.getAttribute("data-characterId"));
        data.append("healthNumber", characterAncestor.querySelector("#healthInput").value);
        request.send(data);
    }

    //Substract health button
    if(target.classList.contains("substractHealthBtn")) {
        let characterAncestor = target.closest(".character");
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", `indexActions.php`, true);

        let data = new FormData();
        data.append("action", "adjustHealth");
        data.append("characterId", characterAncestor.getAttribute("data-characterId"));
        data.append("healthNumber", characterAncestor.querySelector("#healthInput").value * -1);            
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
    
    //show character conditions to add
    if(target.classList.contains("addConditionBtn")) {        
        const options = target.nextSibling;
        if(options.style.display != "grid") {
            options.style.display = "grid";
            options.animate(
                [
                    { opacity: 1 }
                ],
                selectAnimOptions
            )
        }
        else {
            let fadeOutAnimation = options.animate(
                [
                    { opacity: 0 }
                ],
                selectAnimOptions
            )
            fadeOutAnimation.onfinish = () => { options.style.display = "none"; }
        }
    }

    //add selected character condition
    if(target.classList.contains("option")) {
        let conditionId = target.getAttribute("data-id");
        let request = new XMLHttpRequest();
        let turnsLeft = prompt("How long should the condition last ?");
        request.open("post", "indexActions.php");
        request.onload = () => {
            
            updateCharactersList();
        }
        let formData = new FormData();
        formData.append("action", "addCondition");
        formData.append("conditionId", conditionId);
        formData.append("characterId", target.closest(".character").getAttribute("data-characterId"));
        formData.append("turnsLeft", turnsLeft);
        request.send(formData);
    }

    //delete clicked condition
    if(target.classList.contains("condition")) {
        let characterConditionId = target.getAttribute("data-character-condition-id");
        let formData = new FormData();
        formData.append("action", "deleteCondition");
        formData.append("characterId", target.closest(".character").getAttribute("data-characterId"));
        formData.append("characterConditionId", characterConditionId);
        let request = new XMLHttpRequest();
        request.onload = updateCharactersList;
        request.open("post", "indexActions.php");
        request.send(formData);
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
    
    if( !target.classList.contains("side-panel") && 
        !target.parentNode.classList.contains("side-panel") && 
        !target.parentNode.parentNode.classList.contains("side-panel") && 
        target.id != "menuIcon") {
        hideSidePanelMenu();
    }
});

//Handle input changes
listOfCharacters.addEventListener("change", (e) => {
    const target = e.target;

    //initaitive
    if (target.id === "modifiedInitiativeInput") {
        let characterAncestor = target.closest(".character");
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", "indexActions.php", true);

        let data = new FormData();
        data.append("action", "changeInitiative");
        data.append("initiative", target.value);
        data.append("characterId", characterAncestor.getAttribute("data-characterId"));
        request.send(data);
    }

    //armor class
    if(target.id == "modifiedACInput") {
        let characterAncestor = target.closest(".character");
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", `indexActions.php`);

        let data = new FormData();
        data.append("action", "changeAC")
        data.append("AC", target.value)
        data.append("characterId", characterAncestor.getAttribute("data-characterId"))
        request.send(data);
    }

    //health
    if(target.id = "newHealthInput") {
        console.log(target.value);
        
        let characterAncestor = target.closest(".character");
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", `indexActions.php`);

        let data = new FormData();
        data.append("action", "changeHealth")
        data.append("health", target.value)
        data.append("characterId", characterAncestor.getAttribute("data-characterId"))
        request.send(data);
    }

    //max health
    if(target.id == "newMaxHealthInput") {
        let characterAncestor = target.closest(".character");
        let request = new XMLHttpRequest();
        request.onload = function() { updateCharactersList(); };
        request.open("post", `indexActions.php`);

        let data = new FormData();
        data.append("action", "changeMaxHealth")
        data.append("maxHealth", target.value)
        data.append("characterId", characterAncestor.getAttribute("data-characterId"))
        request.send(data);
    }
});

//Handle character double clicks
listOfCharacters.addEventListener("dblclick", (e) => {
    let target = e.target.closest(".character");

    if(e.target.classList.contains("characterName")) {
        target = e.target;
        isEditing = true;
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
                request.onload = function() { 
                    updateCharactersList();
                    isEditing = false;
                };
                request.open("post", "indexActions.php", true);
                request.send(data);
            } else {
                target.innerHTML = oldName;
            }
        });

        target.innerHTML = "";
        target.appendChild(inputNewNameElement);
        inputNewNameElement.focus();
        return;
    }
    
    if(target.classList.contains("character")) {
        setCurrentCharacter(target, false);
    }
})

resetTurnCounterBtn.addEventListener("click", (e) => {
    let request = new XMLHttpRequest();
    request.open("post", "indexActions.php");
    request.onload = updateTurnCounter;
    let data = new FormData();
    data.append("action", "resetTurnCounter");
    request.send(data);
    resetTurnCounterBtn.blur();
});

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
    if(e.key == " " && !isEditing) {
        if(!e.shiftKey)  {
            setCurrentCharacter(getNextCharacter(), true);
            incrementTurnCounter();
        }
        else {
            setCurrentCharacter(getPreviousCharacter(), false)
            decrementTurnCounter();
        };
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

updateCharactersList().then(() => {    
    setCurrentCharacter(null, false);
    updateTurnCounter();
});