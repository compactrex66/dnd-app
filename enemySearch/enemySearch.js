const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");
const parseMarkdownForm = document.getElementById("parseMarkdown");
let infoElement = document.getElementById("info");

searchButton.addEventListener("click", () => {
    const monsterName = monsterInput.value.toLowerCase();
    if (monsterName) {
        searchMonster(monsterName);
    } else {
        monsterResult.innerHTML = "Please enter a monster name.";
    }
});

function searchMonster(monsterName) {
    fetch("https://www.dnd5eapi.co/api/monsters")
        .then(response => response.json())
        .then(data => {
            const monsters = data.results;
            const matchedMonster = monsters.find(monster => monster.name.toLowerCase() === monsterName);

            if (!matchedMonster) {
                monsterResult.innerHTML = "Monster not found.";
                return;
            }
            return fetch("https://www.dnd5eapi.co" + matchedMonster.url);
        })
        .then(response => response.json())
        .then(data => {
            const markdown = generateMarkdown(data);
            monsterResult.innerHTML = `${markdown}`;
            infoElement.value = monsterResult.innerHTML;
            parseMarkdownForm.submit();
        })
        .catch(error => console.error("Error fetching data:", error));
}

function generateMarkdown(data) {
    let markdown =
`___
>## ${data.name}
>*${data.size} ${data.type}${data.subtype ? ` (${data.subtype})` : ''}, ${data.alignment}*
>___
>- **Armor Class** ${data.armor_class[0].value}${data.armor_class[0].armor?.[0]?.name ?? ` (${data.armor_class[0].type} armor)`}
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
    return mod >= 0 ? `+${mod}` : `${mod}`;
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
            markdown += '';
        }
        markdown += '\r';
    }

    if (data.damage_resistances.length > 0) {
        markdown += `>- **Damage Resistances** `
        for (let damage_resistance of data.damage_resistances) {
            markdown += damage_resistance + "; ";
        }
        markdown += '\r'
    }

    if (data.damage_immunities.length > 0) {
        markdown += `>- **Damage Immunities** `
        for (let damage_immunity of data.damage_immunities) {
            markdown += damage_immunity + "; ";
        }
        markdown += '\r'
    }

    if (data.condition_immunities.length > 0) {
        markdown += `>- **Condition Immunities** `
        for (let condition_immunity of data.condition_immunities) {
            markdown += condition_immunity + "; ";
        }
        markdown += '\r'
    }

    if (data.senses) {
        markdown += `>- **Senses** `        
        for (let sense in data.senses) {            
            markdown += `${sense} ${data.senses[sense]}, `.replace('.', '');
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