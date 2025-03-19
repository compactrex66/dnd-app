const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterInfo = document.getElementById("monsterInfo");
const matchList = document.getElementById("matchList");
const parseMarkdownForm = document.getElementById("parseMarkdown");
const addMonsterBtn = document.getElementById("addEnemyBtn");
const actionInput = document.getElementById("actionInput");
const monsterNameElement = document.getElementById("monsterName");
const minHealth = document.getElementById("minHealth");
const maxHealth = document.getElementById("maxHealth");
const armorClass = document.getElementById("armorClass");
const initiativeBonus = document.getElementById("initiativeBonus");

let markdownResult = document.getElementById("markdownResult");
let serverMonsterName = document.getElementById("monsterName");
let enemyInfo, monsterName;

searchButton.addEventListener("click", () => {
    monsterName = monsterInput.value.toLowerCase();
    if (monsterName) {
        matchList.innerHTML = '';
        searchMonster(monsterName);
    } else {
        monsterInfo.innerHTML = "Please enter a monster name.";
    }
});

addMonsterBtn.addEventListener("click", () => {
    let formData = new FormData();
    formData.append("action", "checkIfExists");
    formData.append("monsterName", monsterNameElement.innerText)
    let request = new XMLHttpRequest();
    request.onload = () => {
        if(request.responseText == true) {
            alert("Such enemy already exists");
        } else {
            enemyInfo = markdownResult.innerHTML;
            
            formData.append("action", "addEnemy");
            formData.append("name", monsterNameElement.innerText);
            formData.append("minHealth", minHealth.innerText);
            formData.append("maxHealth", maxHealth.innerText);
            formData.append("armorClass", armorClass.innerText);
            formData.append("initiativeBonus", initiativeBonus.innerText);
            formData.append("info", markdownResult.innerHTML.replaceAll("&gt;", ">"));

            request = new XMLHttpRequest();
            request.onload = () => {
                alert("Enemy has been added to the database");
            }
            request.open("post", `enemySearchScript.php`, true);
            request.send(formData);
        }
    }
    request.open("post", "enemySearchScript.php", true);
    request.send(formData);
});

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
                        let formData = new FormData();
                        formData.append("markdown", markdown);
                        let request = new XMLHttpRequest();
                        markdownResult.innerHTML = markdown;
                        monsterNameElement.innerText = data.name;
                        let healthValues = data.hit_points_roll.match(/[0-9]+/gm);
                        for(let i = 0; i < healthValues.length; i++) healthValues[i] = parseInt(healthValues[i]);
                        if(healthValues.length < 3) healthValues[2] = 0;
                        minHealth.innerText = healthValues[0] + healthValues[2];
                        maxHealth.innerText = healthValues[0] * healthValues[1] + healthValues[2];
                        armorClass.innerText = data.armor_class[0].value;
                        initiativeBonus.innerText = modifier(data.dexterity);
                        request.onload = () => {
                            monsterInfo.innerHTML = request.responseText;
                        }
                        request.open("post", "parseMarkdown.php", true);
                        request.send(formData);
                    })
                    matchList.appendChild(monsterElement);
                })
                .catch(error => console.error("Error fetching data:", error));
            }
            
            if (!matchedMonsters) {
                monsterInfo.innerHTML = "Monster not found.";
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

if(data.reactions) {
    markdown += `>### Reactions`;
    data.reactions.forEach(element => {
        markdown += `\r>**${element.name}.** ${element.desc}`;
    });
}

if(data.legendary_actions.length > 0) {
    markdown += `
>### Legendary Actions
>*Legendary Action Uses: 3. Immediately after another creature's turn, The ${data.name} can expend a use to take one of the following actions. The ${data.name} regains all expended uses at the start of each of its turns.*\r>`
    data.legendary_actions.forEach(element => {
        markdown += `\r>**${element.name}.** ${element.desc}`;
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