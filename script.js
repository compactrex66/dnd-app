let actionForm = document.getElementById("actionForm")
let actionInput = document.getElementById("actionInput")
let characterIdInput = document.getElementById("characterIdInput")
let healthInput = document.getElementById("healthInput")
let initiativeInput = document.getElementById("initiativeInput")
let ACInput = document.getElementById("ACInput")

let arrOfDeleteBtns = document.querySelectorAll(".deleteBtn")
for(let i = 0; i < arrOfDeleteBtns.length; i++) {
    arrOfDeleteBtns[i].addEventListener("click", () => {
        actionInput.value = "delete"
        characterIdInput.value = arrOfDeleteBtns[i].parentNode.parentNode.getAttribute("data-characterId");
        actionForm.submit();
    });
}

let arrOfInitiativeInput = document.querySelectorAll("#modifiedInitiativeInput")
for(let i = 0; i < arrOfInitiativeInput.length; i++) {
    arrOfInitiativeInput[i].addEventListener("change", () => {
        actionInput.value = "changeInitiative";
        characterIdInput.value = arrOfInitiativeInput[i].parentNode.parentNode.getAttribute("data-characterId");
        initiativeInput.value = arrOfInitiativeInput[i].value
        actionForm.submit();
    });
}

let arrOfACInput = document.querySelectorAll("#modifiedACInput")
for(let i = 0; i < arrOfACInput.length; i++) {
    arrOfACInput[i].addEventListener("change", () => {
        actionInput.value = "changeAC";
        characterIdInput.value = arrOfACInput[i].parentNode.parentNode.getAttribute("data-characterId");
        ACInput.value = arrOfACInput[i].value
        actionForm.submit();
    });
}

let arrOfAddHealthBtns = document.querySelectorAll(".greenBtn")
for(let i = 0; i < arrOfAddHealthBtns.length; i++) {
    arrOfAddHealthBtns[i].addEventListener("click", () => {
        actionInput.value = "adjustHealth";
        characterIdInput.value = arrOfAddHealthBtns[i].parentNode.parentNode.getAttribute("data-characterId");
        healthInput.value = arrOfAddHealthBtns[i].previousElementSibling.value;
        actionForm.submit(); 
    });
}

let arrOfSubHealthBtns = document.querySelectorAll(".redBtn")
for(let i = 0; i < arrOfSubHealthBtns.length; i++) {
    arrOfSubHealthBtns[i].addEventListener("click", () => {
        actionInput.value = "adjustHealth";
        characterIdInput.value = arrOfSubHealthBtns[i].parentNode.parentNode.getAttribute("data-characterId");
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
    hideMoreInfoElement()
});

function formatMoreInfoString(string) {
    let name = string.match(/[a-zA-Z <>\d\/]+$/g)[0]
    string = string.replace(/[a-zA-Z <>\d\/]+$/g, "")
    console.log(name);
    
    string = string.replace("Temporary Statblock. This statblock is a placeholder.", "")
    string = string.replaceAll("mod", "")
    string = string.replaceAll("save", "")
    string = string.replaceAll("\t","\n")
    string = string.replaceAll("\n\n\n\n\n\n\n\n\n\n\n\n\n\n","\n")
    let statistics = string.match(/[0-9]+\s+[+,-][0-9]+\s+[+,-][0-9]+/g)
    let statsTable = `<table id='statsTable'>
    <tr><th>Stats</th><th>Str</th><th>Dex</th><th>Con</th><th>Int</th><th>Wis</th><th>Cha</th></tr>`
    let row1 = "<tr><td>Ability</td>"
    let row2 = "<tr><td>Mod</td>"
    let row3 = "<tr><td>Save</td>"

    for(let i = 0; i < statistics.length; i++) {
        statistics[i] = statistics[i].replaceAll("\n\n\n", "\n")
        row1 += `<td>${statistics[i].slice(0, statistics[i].indexOf("\n"))}</td>`
        row2 += `<td>${statistics[i].match(/[+,-]\d{1,2}/g)[0]}</td>`
        row3 += `<td>${statistics[i].match(/[+,-]\d$/g)[0]}</td>`        
    }
    row1 += "</tr>"
    row2 += "</tr>"
    row3 += "</tr>"
    statsTable += row1 + row2 + row3 + "</table>"
    string = string.replace("Skills", statsTable + "\nSkills")
    string = string.replace("\n\n\n", "\n\n")
    string = string.replace(/(Initiative).+[\n]/g, "")
    string = string.replace(/^[a-zA-Z ,()]+/g, "<div class='moreInfoName'>"+name+"<span style='font-weight: lighter; font-style: italic;'>"+string.match(/^[a-zA-Z ,()]+/g)[0]+"</span></div>")
    string = string.replaceAll(/\w{3}\s{3}|\d{1,2}\s{3}|[+,-]\d\s{3}/g, "")
    string = string.replaceAll(/\s{2}[+,-]\d{1,2}\s[+,-]\d{1,2}/g, "")
    let matches = string.match(/\n[a-zA-Z \/()\d]+[.:][ ]|\n[a-zA-Z]+[ ]/g)
    for(let i = 0; i < matches.length; i++) {
        string = string.replace(matches[i].replace("\n", ""), "<span class='specialText'>"+matches[i].replace("\n", "")+"</span>")
    }
    string = string.replaceAll(/(?<!\n)\n(?!\n)/g, "\n\n")
    string = string.replaceAll("\n", "<br>")
    string = string.replace("Actions<br>","<h2>Actions</h2>")
    string = string.replace("Traits<br>","<h2>Traits</h2>")
    string = string.replace("<table id='statsTable'><br><br>", "<table id='statsTable'>")
    string = string.replace("<br>", "")
    
    return string;
}

let arrOfCharacterElements = document.querySelectorAll(".character")
let moreInfoElement = document.getElementById("moreInfo")
for(let i = 0; i < arrOfCharacterElements.length; i++) {
    arrOfCharacterElements[i].addEventListener("click", () => {
        let moreInfo = arrOfCharacterElements[i].querySelector(".moreInfo").innerHTML;
        moreInfo = formatMoreInfoString(moreInfo + arrOfCharacterElements[i].querySelector(".name").innerHTML)
        moreInfoElement.innerHTML = moreInfo
        moreInfoMenu.style.zIndex = 1;
        moreInfoMenu.animate(
            { opacity: 1 },
            { fill: "forwards", duration: 125}
        )
    });
}

function hideMoreInfoElement() {
    let animation = moreInfoMenu.animate(
        { opacity: 0 },
        { fill: "forwards", duration: 125}
    )
    animation.onfinish = () => {moreInfoMenu.style.zIndex = -1;}
}

document.querySelectorAll(".character > *").forEach(function(child) {
    child.addEventListener("click", (e) => {
        e.stopPropagation();
    });
})

window.onkeydown = function(Key) {
    if(Key.keyCode == 27) {
        hideMoreInfoElement()
    }
}