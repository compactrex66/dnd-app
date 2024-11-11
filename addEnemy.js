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
    firstLine = enemyInfo.slice(0, enemyInfo.indexOf("\n")+2);
    enemyInfo = enemyInfo.replace(firstLine, "")
    armorClass = firstLine.match(/\d+/)[0]
    firstLine = enemyInfo.slice(0, enemyInfo.indexOf("\n")+2)
    enemyInfo = enemyInfo.replace(firstLine, "")
    firstLine = firstLine.replace(firstLine.slice(0, firstLine.indexOf("(")), "")
    healthValues = firstLine.match(/\d+/g)
    minHealth = parseInt(healthValues[0]) + parseInt(healthValues[2])
    maxHealth = healthValues[0] * healthValues[1] + healthValues[2]*1
    initiativeBonus = (enemyInfo.match(/\d+\s+\([\+\-−]?\d+\)/g)[1]).match((/[\+\-−]\d+/))[0]
    initiativeBonus = initiativeBonus ? parseInt(initiativeBonus.replace("−", "-"), 10) : null
    providedName = document.getElementById("providedNameInput").value
    
    nameInput.value = providedName
    minHealthInput.value = minHealth
    maxHealthInput.value = maxHealth
    armorClassInput.value = armorClass
    initiativeBonusInput.value = initiativeBonus
    moreInfoInput.value = enemyInfo

    addNewEnemyHiddenForm.submit()
});