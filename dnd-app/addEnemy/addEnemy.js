let addEnemyBtn = document.getElementById("addEnemyBtn");
let addNewEnemyHiddenForm = document.getElementById("addNewEnemyHiddenForm");
let nameInput = document.getElementById("nameInput")
let minHealthInput = document.getElementById("minHealthInput")
let maxHealthInput = document.getElementById("maxHealthInput")
let armorClassInput = document.getElementById("armorClassInput")
let initiativeBonusInput = document.getElementById("initiativeBonusInput")
let moreInfoInput = document.getElementById("moreInfoInput")
let enemyInfo, armorClass, healthValues, minHealth, maxHealth, firstLine, initiativeBonus, providedName

addEnemyBtn.addEventListener("click", () => {
    enemyInfo = document.getElementById("enemyInfo").value
    let healthValues = enemyInfo.match(/\d+\s[(]\d+[d]\d+\s[+]\s\d+/gm)[0]
    healthValues = healthValues.match(/\d+/g)
    
    minHealth = healthValues.length == 4 ? parseInt(healthValues[1]) + parseInt(healthValues[3]) : parseInt(healthValues[1])
    maxHealth = healthValues.length == 4 ? parseInt(healthValues[1]) * parseInt(healthValues[2]) + parseInt(healthValues[3]) : parseInt(healthValues[1]) * parseInt(healthValues[2])
    
    armorClass = enemyInfo.match(/[s]{2}[*]{2}\s\d+/gm)[0].match(/\d+/)[0]
    initiativeBonus = parseInt(enemyInfo.match(/\d+\s[(].\d+[)]/gm)[1].match(/[+,-]\d+/)[0])    
    
    nameInput.value = enemyInfo.match(/\n(>## ).+/gm)[0].match(/[a-zA-Z]+/)[0];
    minHealthInput.value = minHealth
    maxHealthInput.value = maxHealth
    armorClassInput.value = armorClass
    initiativeBonusInput.value = initiativeBonus
    moreInfoInput.value = enemyInfo

    addNewEnemyHiddenForm.submit()
});