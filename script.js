let actionForm = document.getElementById("actionForm")
let actionInput = document.getElementById("actionInput")
let characterIdInput = document.getElementById("characterIdInput")
let healthInput = document.getElementById("healthInput")
let initiativeInput = document.getElementById("initiativeInput")

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

document.getElementById("addAnotherEnemyBtn").addEventListener("click", () => {
    window.location.href = "addEnemy.php"
});

let deleteEnemiesBtn = document.getElementById("deleteEnemiesBtn")
deleteEnemiesBtn.addEventListener("click", () => {
    actionInput.value = "deleteAllEnemies";
    if(confirm('Are you sure you want delete all enemies ?'))
        actionForm.submit();
});

let closeMoreInfoBtn = document.getElementById("closeMoreInfo")
let moreInfoMenu = document.getElementById("moreInfoMenu")
closeMoreInfoBtn.addEventListener("click", () => {
    moreInfoMenu.animate(
        { opacity: 0 },
        { fill: "forwards", duration: 125}
    )
    moreInfoMenu.style.zIndex = -1;
});

function formatMoreInfoString(string) {
    let firstLine = string.slice(0, string.indexOf("\n")+1)
    string = string.replace(firstLine, "");
    string = string.replaceAll("\n", "<br>")

    let secondLine = string.slice(0, string.indexOf("<br>")+4)
    string = string.replace(secondLine, `<table id='statsTable'><tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>`)
    secondLine = string.slice(0, string.indexOf("</tr>")+5)

    let thirdLine = string.slice(secondLine.length, string.indexOf("<br>"))
    let modifiedThirdLine = thirdLine
    let items = modifiedThirdLine.match(/\d+\s+\([\+\-−]?\d+\)/g); 
    
    modifiedThirdLine = `<tr>${items.map(item => `<td>${item}</td>`).join('')}</tr></table>`;
    
    string = string.replace(thirdLine, modifiedThirdLine+"<br>"+firstLine)

    return string;
}

let arrOfCharacterElements = document.querySelectorAll(".character")
let moreInfoElement = document.getElementById("moreInfo")
for(let i = 0; i < arrOfCharacterElements.length; i++) {
    arrOfCharacterElements[i].addEventListener("click", () => {
        let moreInfo = arrOfCharacterElements[i].querySelector(".moreInfo").innerText;
        moreInfo = formatMoreInfoString(moreInfo)
        moreInfoElement.innerHTML = moreInfo
        moreInfoMenu.style.zIndex = 1;
        moreInfoMenu.animate(
            { opacity: 1 },
            { fill: "forwards", duration: 125}
        )
    });
}

document.querySelectorAll(".character > *").forEach(function(child) {
    child.addEventListener("click", (e) => {
        e.stopPropagation();
    });
})