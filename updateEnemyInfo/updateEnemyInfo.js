const listOfCharacters = document.getElementById("enemyList");
const moreInfoPanel = document.getElementById("moreInfoPanel");
const updateEnemiesInfoBtn = document.getElementById("updateEnemiesInfoBtn");

listOfCharacters.addEventListener("click", e => {    
    let target = e.target;
    if(target.classList.contains("character")) {
        moreInfoPanel.innerHTML = target.querySelector(".more-info").innerHTML;
    }
});

updateEnemiesInfoBtn.addEventListener("click", e => {
    let characters = listOfCharacters.querySelectorAll(".character");
    characters.forEach(async character => {
        let characterDocumentKey = character.querySelector(".character-document-key").innerText;
        let monster = await fetchNewMonsterInfo(characterDocumentKey);        
        let formData = new FormData();
        formData.append("action", "updateEnemy");
        formData.append("name", monster['name']);
        formData.append("minHealth", monster['minHealth']);
        formData.append("maxHealth", monster['maxHealth']);
        formData.append("armorClass", monster['armorClass']);
        formData.append("initiativeBonus", monster['initiativeBonus']);
        formData.append("documentKey", monster['documentKey']);
        formData.append("info", monster['moreInfo']);
        let request = new XMLHttpRequest();
        request.open('POST', 'updateEnemyScript.php', true);
        request.send(formData);
        request.onload = () => {
            if(request.status == 200)
                alert(`Monster ${monster['name']} (${monster['documentKey']}) updated successfuly`);
            else
                alert(`Something went wrong: ${request.status}`);
        }
    });
});

async function fetchNewMonsterInfo(monsterDocumentKey) {
    let response = await fetch(`https://api.open5e.com/v2/creatures/${monsterDocumentKey}`);
    if(response.ok) {
        let json = await response.json();
        return monsterInfo = getMonsterInfo(json);
    } else {
        alert("HTTP-Error: " + response.status + response.url);
    }
}