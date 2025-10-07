const openMenuBtn = document.getElementById("menuIcon");
const closeMenuBtn = document.getElementById("sidePanelCloseBtn");
const menuSidePanel = document.getElementById("menu");

openMenuBtn.addEventListener("click", showSidePanelMenu);

closeMenuBtn.addEventListener("click", hideSidePanelMenu);

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
                ${monster.armor_class} ${monster.armor_detail != "" ? ` (${monster.armor_detail})` : ``}
            </li>
            <li>
                <strong>Hit Points </strong>
                ${monster.hit_points} (${monster.hit_dice ?? "No Hit Dice"})
            </li>
            <li>
                <strong>Speed </strong>
                ${monster.speed_all.walk} ${monster.speed_all.fly != 0 ? ', Fly '+monster.speed_all.fly : ''} ${monster.speed_all.burrow != 0 ? ', Burrow '+monster.speed_all.burrow : ''} ${monster.speed_all.unit}
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
                    <td><strong>Str</strong></td>
                    <td>${monster.ability_scores.strength}</td>
                    <td>${monster.modifiers.strength >= 0 ? `+${monster.modifiers.strength}` : monster.modifiers.strength}</td>
                    <td>${monster.saving_throws_all.strength >= 0 ? `+${monster.saving_throws_all.strength}` : monster.saving_throws_all.strength}</td>
                </tr>
                <tr>
                    <td><strong>Int</strong></td>
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
                    <td><strong>Dex</strong></td>
                    <td>${monster.ability_scores.dexterity}</td>
                    <td>${monster.modifiers.dexterity >= 0 ? `+${monster.modifiers.dexterity}` : monster.modifiers.dexterity}</td>
                    <td>${monster.saving_throws_all.dexterity >= 0 ? `+${monster.saving_throws_all.dexterity}` : monster.saving_throws_all.dexterity}</td>
                </tr>
                <tr>
                    <td><strong>Wis</strong></td>
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
                    <td><strong>Con</strong></td>
                    <td>${monster.ability_scores.constitution}</td>
                    <td>${monster.modifiers.constitution >= 0 ? `+${monster.modifiers.constitution}` : monster.modifiers.constitution}</td>
                    <td>${monster.saving_throws_all.constitution >= 0 ? `+${monster.saving_throws_all.constitution}` : monster.saving_throws_all.constitution}</td>
                </tr>
                <tr>
                    <td><strong>Cha</strong></td>
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
    html +=`${monster.resistances_and_immunities.damage_resistances_display != "" ? `<li><strong>Resistances </strong>${monster.resistances_and_immunities.damage_resistances_display}</li>`: ""}
            ${monster.resistances_and_immunities.damage_immunities_display != "" ? `<li><strong>Immunities </strong>${monster.resistances_and_immunities.damage_immunities_display}</li>`: ""}
            <li>
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
        ${!isEmpty(monster.traits) ? `<h3>Traits</h3>` : ''}
        ${monster.traits.map(trait => `<p><strong><em>${trait.name}. </em></strong>${trait.desc.replaceAll(/\n{2}|\n| - /gm, "<br><br>")}</p>`).join('')}
        
        ${!isEmpty(monster.actions.filter(action => action.action_type == "ACTION")) ? `<h3>Actions</h3>` : ''}
        ${monster.actions.filter(action => action.action_type == "ACTION").map(action => `<p><strong><em>${action.name}. </em></strong>${action.desc.replaceAll(/\n{2}|\n| - /gm, "<br><br>")}</p>`).join('')}

        ${!isEmpty(monster.actions.filter(action => action.action_type == "BONUS_ACTION")) ? `<h3>Bonus Actions</h3>` : ''}
        ${monster.actions.filter(action => action.action_type == "BONUS_ACTION").map(action => `<p><strong><em>${action.name}. </em></strong>${action.desc.replaceAll(/\n{2}|\n| - /gm, "<br><br>")}</p>`).join('')}
        
        ${!isEmpty(monster.actions.filter(action => action.action_type == "REACTION")) ? `<h3>Reactions</h3>` : ''}
        ${monster.actions.filter(action => action.action_type == "REACTION").map(action => `<p><strong><em>${action.name}. </em></strong>${action.desc.replaceAll(/\n{2}|\n| - /gm, "<br><br>")}</p>`).join('')}
        
        ${!isEmpty(monster.actions.filter(action => action.action_type == "LEGENDARY_ACTION")) ? `<h3>Legendary Actions</h3>` : ''}
        ${monster.actions.filter(action => action.action_type == "LEGENDARY_ACTION").map(action => `<p><strong><em>${action.name}. </em></strong>${action.desc.replaceAll(/\n{2}|\n| - /gm, "<br><br>")}</p>`).join('')}
        <br>
    </blockquote>
    `
    return cleanUp(convertStarLinesToList(html));
}

function getMonsterInfo(monster) {
    postMonsterName = monster.name;                
    if(monster.hit_dice != null) {
        minHealth = monster.hit_dice.match(/\d+/)*1 + monster.hit_dice.match(/(?<=\+)\d+$/)*1;
        maxHealth = monster.hit_dice.match(/\d+/) * monster.hit_dice.match(/(?<=d)\d+/)*1 + monster.hit_dice.match(/\d+$/)*1;
    } else {
        minHealth = monster.hit_points;
        maxHealth = minHealth;
    }
    armorClass = monster.armor_class;
    initiativeBonus = monster.initiative_bonus;
    documentKey = monster.key;
    moreInfo = generateHtml(monster);
    return {'name': postMonsterName, 'minHealth': minHealth, 'maxHealth': maxHealth, 'armorClass': armorClass, 'initiativeBonus': initiativeBonus, 'documentKey': documentKey, 'moreInfo': moreInfo}
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function convertStarLinesToList(text) {
    //Match all lines starting with <br><br>*
    let listLines = [...text.matchAll(/(?:<br><br>\* )((?:\d|Cantrips)[^<]+)/g)].map(match => match[1]);
    // listLines = listLines.map(line => line.replaceAll(/[\w\d ()]+(?=\:)/g, match => `<strong>${match}</strong>`));

    if(isEmpty(listLines))
        return text;    

    const listHtml = `<ul>\n${listLines.map(item => `  <li>${item}</li>`).join('\n')}\n</ul>`;
    return text.replace(/<br><br>[\s\S]*?(?=\* The archmage casts|<\/p>)/g, listHtml)
}

function cleanUp(text) {
    return text.replaceAll(/_(.*?)_/g, (_, g1) => g1);
}

let menuSidePanelAnimOptions = {
    duration: 300,
    fill: "forwards",
    easing: "cubic-bezier(0,.73,.17,1.11)",
}
function hideSidePanelMenu() {
    menuSidePanel.animate(
        [
            { translate: "16vw 0" }
        ],
        menuSidePanelAnimOptions
    )
}

function showSidePanelMenu() {
    menuSidePanel.animate(
        [
            { translate: "0 0" }
        ],
        menuSidePanelAnimOptions
    )
}