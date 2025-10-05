const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterInfo = document.getElementById("monsterInfo");
const matchList = document.getElementById("matchList");
const addMonsterBtn = document.getElementById("addEnemyBtn");
const monsterNameElement = document.getElementById("monsterName");

let markdownResult = document.getElementById("markdownResult");
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

async function searchMonster(monsterName) {
    let response = await fetch(`https://api.open5e.com/v2/creatures/?name__icontains=${monsterName}`);
    if(response.ok) {
        let json = await response.json();
        monsterInfo.innerHTML = generateHtml(json['results'][2]);
        // json['results'].forEach(monster => {
        //     generateHtml(monster);
        // });
    } else {
        alert("HTTP-Error: " + response.status + response.url);
    }
}

function generateHtml(monster) {
    let html =
    `
    <blockquote>
        <h2>${monster.name}</h2>
        <p>
            <em>${monster.size.name} ${monster.type.name}, ${monster.alignment}</em>
        </p>
        <ul>
            <li>
                <strong>Armor Class </strong>
                ${monster.armor_class} ${monster.armor_detail != "" ? `, ${monster.armor_detail}` : ``}
            </li>
            <li>
                <strong>Hit Points </strong>
                ${monster.hit_points} (${monster.hit_dice ?? "No Hit Dice"})
            </li>
            <li>
                <strong>Speed </strong>
                ${monster.speed_all.walk} ${monster.speed_all.fly != 0 ? ', '+monster.speed_all.fly : ''} ${monster.speed_all.burrow != 0 ? ', '+monster.speed_all.burrow : ''} ${monster.speed_all.unit}
            </li>
            <li>
                <strong>Initiative </strong>
                ${monster.initiative_bonus >= 0 ? `+${monster.initiative_bonus}` : monster.initiative_bonus}
            </li>
        </ul>
        <div class="inline-row">
            <table>
                <tr>
                    <th colspan="2"></th>
                    <th>MOD</th>
                    <th>SAVE</th>
                </tr>
                <tr>
                    <td>Str</td>
                    <td>${monster.ability_scores.strength}</td>
                    <td>${monster.modifiers.strength >= 0 ? `+${monster.modifiers.strength}` : monster.modifiers.strength}</td>
                    <td>${monster.saving_throws_all.strength >= 0 ? `+${monster.saving_throws_all.strength}` : monster.saving_throws_all.strength}</td>
                </tr>
                <tr>
                    <td>Int</td>
                    <td>${monster.ability_scores.intelligence}</td>
                    <td>${monster.modifiers.intelligence >= 0 ? `+${monster.modifiers.intelligence}` : monster.modifiers.intelligence}</td>
                    <td>${monster.saving_throws_all.intelligence >= 0 ? `+${monster.saving_throws_all.intelligence}` : monster.saving_throws_all.intelligence}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <th colspan="2"></th>
                    <th>MOD</th>
                    <th>SAVE</th>
                </tr>
                <tr>
                    <td>Dex</td>
                    <td>${monster.ability_scores.dexterity}</td>
                    <td>${monster.modifiers.dexterity >= 0 ? `+${monster.modifiers.dexterity}` : monster.modifiers.dexterity}</td>
                    <td>${monster.saving_throws_all.dexterity >= 0 ? `+${monster.saving_throws_all.dexterity}` : monster.saving_throws_all.dexterity}</td>
                </tr>
                <tr>
                    <td>Wis</td>
                    <td>${monster.ability_scores.wisdom}</td>
                    <td>${monster.modifiers.wisdom >= 0 ? `+${monster.modifiers.wisdom}` : monster.modifiers.wisdom}</td>
                    <td>${monster.saving_throws_all.wisdom >= 0 ? `+${monster.saving_throws_all.wisdom}` : monster.saving_throws_all.wisdom}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <th colspan="2"></th>
                    <th>MOD</th>
                    <th>SAVE</th>
                </tr>
                <tr>
                    <td>Con</td>
                    <td>${monster.ability_scores.constitution}</td>
                    <td>${monster.modifiers.constitution >= 0 ? `+${monster.modifiers.constitution}` : monster.modifiers.constitution}</td>
                    <td>${monster.saving_throws_all.constitution >= 0 ? `+${monster.saving_throws_all.constitution}` : monster.saving_throws_all.constitution}</td>
                </tr>
                <tr>
                    <td>Cha</td>
                    <td>${monster.ability_scores.charisma}</td>
                    <td>${monster.modifiers.charisma >= 0 ? `+${monster.modifiers.charisma}` : monster.modifiers.charisma}</td>
                    <td>${monster.saving_throws_all.charisma >= 0 ? `+${monster.saving_throws_all.charisma}` : monster.saving_throws_all.charisma}</td>
                </tr>
            </table>
        </div>
        <ul>`
            if(!isEmpty(monster.skill_bonuses)) {                
                html +=
                `<li>
                    <strong>Skills </strong>
                    ${Object.entries(monster.skill_bonuses).map(([key, value]) => `${key} ${value >= 0 ? `+${value}` : value}`).join(', ')}
                </li>`
            }
html +=
`            <li>
                <strong>Senses </strong>
                ${monster.darkvision_range != null ? `Darkvision ${monster.darkvision_range} ft.` : ''}
                ${monster.blindsight_range != null ? `Blindsight ${monster.blindsight_range} ft.` : ''}
                ${monster.tremorsense_range != null ? `Tremorsense ${monster.tremorsense_range} ft.` : ''}
                ${monster.truesight_range != null ? `Truesight ${monster.truesight_range} ft.` : ''}
                Passive Perception ${monster.passive_perception}
            </li>
            <li>
                <strong>Languages </strong>
                ${monster.languages.as_string}
            </li>
            <li>
                <strong>Challenge </strong>
                ${monster.challenge_rating_text} (XP ${monster.experience_points}; PB +${monster.proficiency_bonus ?? 0})
            </li>
        </ul>
        ${monster.traits.map(trait => `<p><strong><em>${trait.name}. </em></strong>${trait.desc.replaceAll(/[\n]| - /gm, "<br><br>")}</p>`).join('')}
        ${monster.actions.map(trait => `<p><strong><em>${trait.name}. </em></strong>${trait.desc.replaceAll(/[\n]| - /gm, "<br><br>")}</p>`).join('')}
    </blockquote>
    `
    return html;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
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

if(data.reactions.length > 0) {
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

searchMonster("Archmage");