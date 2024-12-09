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
    let healthValues = enemyInfo.match(/\d+[d]\d+\s[+]\s\d+|\d+[d]\d+/g)[0]
    healthValues = healthValues.match(/\d+/g)
    
    minHealth = healthValues.length == 3 ? parseInt(healthValues[0]) + parseInt(healthValues[2]) : parseInt(healthValues[0])
    maxHealth = healthValues.length == 3 ? parseInt(healthValues[0]) * parseInt(healthValues[1]) + parseInt(healthValues[2]) : parseInt(healthValues[0]) * parseInt(healthValues[1])
    armorClass = enemyInfo.match(/(AC)\s\d+/g)[0].match(/\d+/)[0]
    initiativeBonus = parseInt(enemyInfo.match(/(Initiative )[+,-]\d+/)[0].match(/[+,-]\d+/)[0])    
    providedName = document.getElementById("providedNameInput").value
    
    nameInput.value = providedName
    minHealthInput.value = minHealth
    maxHealthInput.value = maxHealth
    armorClassInput.value = armorClass
    initiativeBonusInput.value = initiativeBonus
    moreInfoInput.value = enemyInfo

    addNewEnemyHiddenForm.submit()
});