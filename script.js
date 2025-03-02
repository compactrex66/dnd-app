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
    window.location.href = "addCustomEnemy/addCustomEnemy.php"
});

let deleteEnemiesBtn = document.getElementById("deleteEnemiesBtn")
deleteEnemiesBtn.addEventListener("click", () => {
    actionInput.value = "deleteAllEnemies";
    if(confirm('Are you sure you want delete all enemies ?'))
        actionForm.submit();
});

let moreInfoPanel = document.getElementById("moreInfoPanel")
let arrOfCharacterElements = document.querySelectorAll(".character")
for(let i = 0; i < arrOfCharacterElements.length; i++) {
    arrOfCharacterElements[i].addEventListener("click", () => {
        let moreInfo = arrOfCharacterElements[i].querySelector(".moreInfo").innerHTML;
        moreInfoPanel.innerHTML = moreInfo
    });
}

document.querySelectorAll(".character > *").forEach(function(child) {
    child.addEventListener("click", (e) => {
        e.stopPropagation();
    });
})

document.getElementById("shortRestBtn").addEventListener("click", () => {
    actionInput.value = 'shortRest';
    actionForm.submit();
});

document.getElementById("longRestBtn").addEventListener("click", () => {
    actionInput.value = 'longRest';
    actionForm.submit();
});