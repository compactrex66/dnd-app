const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterInfoElement = document.getElementById("monsterInfo");
const matchList = document.getElementById("matchList");
const addMonsterBtn = document.getElementById("addEnemyBtn");

let inputMonsterName, postMonsterName, minHealth, maxHealth, armorClass, initiativeBonus, documentKey, moreInfo;

searchButton.addEventListener("click", () => {
    inputMonsterName = monsterInput.value.toLowerCase();
    if (inputMonsterName) {
        matchList.innerHTML = '';
        searchMonster(inputMonsterName);
    } else {
        monsterInfoElement.innerHTML = "Please enter a monster name.";
    }
});

addMonsterBtn.addEventListener("click", () => {
    let formData = new FormData();
    formData.append("action", "checkIfExists");
    formData.append("monsterName", postMonsterName)
    let request = new XMLHttpRequest();
    request.onload = () => {
        if(request.responseText == true) {
            alert("Such enemy already exists");
        } else {            
            formData.append("action", "addEnemy");
            formData.append("name", postMonsterName);
            formData.append("minHealth", minHealth);
            formData.append("maxHealth", maxHealth);
            formData.append("armorClass", armorClass);
            formData.append("initiativeBonus", initiativeBonus);
            formData.append("documentKey", documentKey);
            formData.append("info", moreInfo);

            request = new XMLHttpRequest();
            request.onload = () => {
                console.log(request.responseText);
                alert("Enemy has been added to the database");
            }
            request.open("post", `enemySearchScript.php`, true);
            request.send(formData);
        }
    }
    request.open("post", "enemySearchScript.php", true);
    request.send(formData);
});

async function searchMonster(monsterName) {
    let response = await fetch(`https://api.open5e.com/v2/creatures/?name__icontains=${monsterName}&ordering=name`);
    if(response.ok) {
        let json = await response.json();
        matchList.innerHTML = "";
        json['results'].forEach(monster => {
            let monsterResult = document.createElement('div');
            monsterResult.setAttribute("class", "inline-row monster");
            monsterResult.innerHTML = `<span>${monster.name}</span><span>${monster.document.key}</span>`;
            monsterResult.addEventListener("click", e => {
                let monsterInfo = getMonsterInfo(monster)
                postMonsterName = monsterInfo['name'];           
                minHealth = monsterInfo['minHealth'];
                maxHealth = monsterInfo['maxHealth'];
                armorClass = monsterInfo['armorClass'];
                initiativeBonus = monsterInfo['initiativeBonus'];
                documentKey = monsterInfo['documentKey'];
                moreInfo = monsterInfo['moreInfo'];
                monsterInfoElement.innerHTML = moreInfo;
            });
            matchList.append(monsterResult);
        });
    } else {
        alert("HTTP-Error: " + response.status + response.url);
    }
}