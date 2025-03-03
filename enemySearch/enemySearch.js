const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");
const matchList = document.getElementById("matchList")
const parseMarkdownForm = document.getElementById("parseMarkdown");
const addMonsterBtn = document.getElementById("addEnemyBtn")
const actionInput = document.getElementById("actionInput")

let nameInput = document.getElementById("nameInput")
let minHealthInput = document.getElementById("minHealthInput")
let maxHealthInput = document.getElementById("maxHealthInput")
let armorClassInput = document.getElementById("armorClassInput")
let initiativeBonusInput = document.getElementById("initiativeBonusInput")

let markdownResult = document.getElementById("markdownResult")
let monsterNameElement = document.getElementById("monsterNameElement")
let serverMonsterName = document.getElementById("monsterName")
let infoElement = document.getElementById("info");
let enemyInfo, armorClass, healthValues, minHealth, maxHealth, firstLine, initiativeBonus, providedName

searchButton.addEventListener("click", () => {
    const monsterName = monsterInput.value.toLowerCase();
    if (monsterName) {
        matchList.innerHTML = '';
        searchMonster(monsterName);
    } else {
        monsterResult.innerHTML = "Please enter a monster name.";
    }
});

addMonsterBtn.addEventListener("click", () => {
    infoElement.value = markdownResult.innerHTML;
    infoElement.value = infoElement.value.replaceAll("&gt;", ">");
    actionInput.value = 'addEnemy';

    enemyInfo = infoElement.value
    let healthValues = enemyInfo.match(/\d+\s[(]\d+[d]\d+\s[+]\s\d+/gm)[0]
    healthValues = healthValues.match(/\d+/g)
    
    minHealth = healthValues.length == 4 ? parseInt(healthValues[1]) + parseInt(healthValues[3]) : parseInt(healthValues[1])
    maxHealth = healthValues.length == 4 ? parseInt(healthValues[1]) * parseInt(healthValues[2]) + parseInt(healthValues[3]) : parseInt(healthValues[1]) * parseInt(healthValues[2])
    
    armorClass = enemyInfo.match(/[s]{2}[*]{2}\s\d+/gm)[0].match(/\d+/)[0]
    initiativeBonus = parseInt(enemyInfo.match(/\d+\s[(].\d+[)]/gm)[1].match(/[+,-]\d+/)[0])    
    
    nameInput.value = enemyInfo.match(/\n(>## ).+/gm)[0].match(/[a-zA-Z ]+/)[0];
    minHealthInput.value = minHealth
    maxHealthInput.value = maxHealth
    armorClassInput.value = armorClass
    initiativeBonusInput.value = initiativeBonus

    parseMarkdownForm.submit();
});

if(serverMonsterName.innerText.replace('\r', '') != '') {
    searchMonster(serverMonsterName.innerText.trim())
}

function searchMonster(monsterName) {
    fetch("https://www.dnd5eapi.co/api/monsters")
        .then(response => response.json())
        .then(data => {
            const monsters = data.results;            
            const matchedMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(monsterName));            
            for(let element of matchedMonsters) {
                fetch("https://www.dnd5eapi.co" + element.url)
                .then(response => response.json())
                .then(data => {
                    const markdown = generateMarkdown(data);
                    const monsterElement = document.createElement("div");
                    monsterElement.classList.add("inline-row");
                    monsterElement.classList.add("monster");
                    monsterElement.innerHTML = element.name + `<pre class="moreMonsterInfo">${markdown}</pre>`
                    monsterElement.addEventListener("click", () => {
                        infoElement.value = monsterElement.querySelector(".moreMonsterInfo").innerHTML;
                        infoElement.value = infoElement.value.replaceAll("&gt;", ">");
                        monsterNameElement.value = monsterName;
                        parseMarkdownForm.submit();
                    })
                    matchList.appendChild(monsterElement);
                })
                .catch(error => console.error("Error fetching data:", error));
            }
            
            if (!matchedMonsters) {
                monsterResult.innerHTML = "Monster not found.";
                return;
            }
        })
        
}

function generateMarkdown(data) {
    let markdown =
`___
>## ${data.name}
>*${data.size} ${data.type}${data.subtype ? ` (${data.subtype})` : ''}, ${data.alignment}*
>___
>- **Armor Class** ${data.armor_class[0].value} (${data.armor_class[0].desc == undefined ? data.armor_class[0].type + " armor": data.armor_class[0].desc})
>- **Hit Points** ${data.hit_points} (${(data.hit_points_roll).replace("+", " + ")})
>- **Speed** ${formatSpeed(data.speed)}
>___
>|STR|DEX|CON|INT|WIS|CHA|
>|:---:|:---:|:---:|:---:|:---:|:---:|
>|${data.strength} (${modifier(data.strength)})|${data.dexterity} (${modifier(data.dexterity)})|${data.constitution} (${modifier(data.constitution)})|${data.intelligence} (${modifier(data.intelligence)})|${data.wisdom} (${modifier(data.wisdom)})|${data.charisma} (${modifier(data.charisma)})|
>___
`
markdown = formatAttributes(data, markdown)
markdown += `>___\r`
data.special_abilities.forEach(element => {
    markdown += `>***${element.name}.*** ${element.desc.replaceAll('\n', '\r>')}\r>\r`;
});

markdown += `>###Actions`
data.actions.forEach(element => {
    markdown += `\r>***${element.name}.*** ${element.desc}\r>`;
});

if(data.legendary_actions.length > 0) {
    markdown += `
>### Legendary Actions
>*Legendary Action Uses: 3. Immediately after another creature's turn, The ${data.name} can expend a use to take one of the following actions. The ${data.name} regains all expended uses at the start of each of its turns.*\r>`
    data.legendary_actions.forEach(element => {
        markdown += `\r>- **${element.name}.** ${element.desc}`;
    });
}
return markdown
}

// Helper functions

function modifier(score) {
    let mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `-${mod}`;
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function formatSpeed(speed) {
    if (typeof speed === "object") {
        return Object.entries(speed).map(([key, value]) => `${key === 'walk' ? '' : key} ${value}`).join(", ");
    }
    return speed;
}

function formatAttributes(data, markdown) {
    let isSkillBonus = false;
    if (data.proficiencies.length > 0) {
        markdown += `>- **Saving Throws** `
        for (let proficiency of data.proficiencies) {
            if(proficiency.proficiency.name.match(/[A-Z]{3}/gm)) {
                markdown += capitalizeFirstLetter(proficiency.proficiency.name.match(/[A-Z]{3}/gm)[0].toLowerCase()) + ` +${proficiency.value}, `;
            } else {
                if(!isSkillBonus) {
                    markdown += `\r>- **Skills** `
                }
                markdown += proficiency.proficiency.name.replace("Skill: ", '') + ` +${proficiency.value}, `;
                isSkillBonus = true;
            }
        }
        markdown += '\r'
    }

    if (data.damage_vulnerabilities.length > 0) {
        markdown += `>- **Damage Vulnerabilities** `
        for (let damage_vulnerability of data.damage_vulnerabilities) {
            markdown += `${damage_vulnerability}, `;
        }
        markdown += '\r';
    }

    if (data.damage_resistances.length > 0) {
        markdown += `>- **Damage Resistances** `
        for (let damage_resistance of data.damage_resistances) {
            markdown += damage_resistance + ", ";
        }
        markdown += '\r'
    }

    if (data.damage_immunities.length > 0) {
        markdown += `>- **Damage Immunities** `
        for (let damage_immunity of data.damage_immunities) {
            markdown += damage_immunity + ", ";
        }
        markdown += '\r'
    }

    if (data.condition_immunities.length > 0) {
        markdown += `>- **Condition Immunities** `
        for (let condition_immunity of data.condition_immunities) {
            markdown += condition_immunity.name + ", ";
        }
        markdown += '\r'
    }

    if (data.senses) {
        markdown += `>- **Senses** `        
        for (let sense in data.senses) {            
            markdown += `${sense} ${data.senses[sense]}, `.replace('.', '').replace('_', ' ');
        }
        markdown += '\r'
    }

    if (data.languages) {
        markdown += `>- **Langauges** ${data.languages}\r`;
    }

    markdown += `>- **Challenge** ${data.challenge_rating} (XP ${data.xp}; PB ${data.proficiency_bonus})\r`
    markdown += `>- **Proficiency Bonus** +${data.proficiency_bonus}\r`
    return markdown;
}