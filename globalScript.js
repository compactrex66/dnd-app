const openMenuBtn = document.getElementById("menuIcon");
const closeMenuBtn = document.getElementById("sidePanelCloseBtn");
const menuSidePanel = document.getElementById("menu");
const spellTooltip = document.getElementById("spellTooltip");

openMenuBtn.addEventListener("click", showSidePanelMenu);

closeMenuBtn.addEventListener("click", hideSidePanelMenu);

let spells = [];
let replacements = {};
async function generateHtml(monster) {
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
                ${monster.speed_all.walk} ${monster.speed_all.fly != 0 ? ', Fly ' + monster.speed_all.fly : ''} ${monster.speed_all.burrow != 0 ? ', Burrow ' + monster.speed_all.burrow : ''} ${monster.speed_all.unit ?? "feet"}
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
    if (!isEmpty(monster.skill_bonuses)) {
        html +=
            `<li>
                    <strong>Skills </strong>
                    ${Object.entries(monster.skill_bonuses).map(([key, value]) => `${key} ${value >= 0 ? `+${value}` : value}`).join(', ')}
                </li>`
    }
    html += `${monster.resistances_and_immunities.damage_resistances_display != "" ? `<li><strong>Resistances </strong>${monster.resistances_and_immunities.damage_resistances_display}</li>` : ""}
            ${monster.resistances_and_immunities.damage_immunities_display != "" ? `<li><strong>Immunities </strong>${monster.resistances_and_immunities.damage_immunities_display}</li>` : ""}
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
        </ul>`;
    let spellFindRegex = /((?<=can cast ).+(?=the))|[\*\n][^:\n]*?: (.+)|(?<=\-[^:\n]+: )([\w ,]*?(?=(?:[-"]|$)))|(?<=_)[\w ]*?(?=_)/g;    
    if (!isEmpty(monster.traits)) {
        let traits = monster.traits;
        traits.forEach(trait => {
            console.log(trait['desc']);
            
            let matches = [...trait['desc'].matchAll(spellFindRegex)];
            if (!isEmpty(matches)) {
                let firstGroup = matches[0][0].replaceAll(/(and|at|will|has|level|\d|without|expending|a|spell|slot|\.|they|have)(?=[ .])/gi, "").trim().split(/ {2,}/);
                console.log(firstGroup);
                
                
                if(firstGroup[0].match(/cantrips|Cantrips/g))
                    firstGroup = [];
                
                matches = matches.map(m => m[2] || m[3]).filter(Boolean);
                
                matches = matches.map(spells => spells.replaceAll('*', '').split(','));
                matches.forEach(match => {
                    match = match.map(match => match.trim());
                    spells = spells.concat(match);
                });
                spells = spells.concat(firstGroup);
            }
        });
    }
    if (!isEmpty(monster.actions.filter(action => action.action_type == "ACTION"))) {
        let actions = monster.actions.filter(action => action.action_type == "ACTION");
        actions.forEach(action => {
            action['desc'] = action['desc'].replaceAll("<br>", "<br><br>");
            let matches = [...action['desc'].matchAll(spellFindRegex)];
            
            if (!isEmpty(matches)) {
                matches = matches.map(m => m[0]).filter(Boolean);
                matches = matches.map(spells => spells.replaceAll('*', '').split(','));
                console.log(matches);
                
                matches.forEach(match => {
                    match = match.map(match => match.trim());
                    spells = spells.concat(match);
                });
            }
        });
    }
    html += `
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
    if (!isEmpty(spells)) {        
        const fetches = spells.map(async (spell) => {
            let spellDocKey = `a5e-ag_${spell.replaceAll(' ', '-').toLowerCase()}`;
            let formData = new FormData();
            formData.append("action", "getSpell");
            formData.append("spellDocumentKey", spellDocKey);
            const json = await new Promise((resolve) => {
                let request = new XMLHttpRequest();
                request.open("post", "../indexActions.php", true);
                request.onload = async () => {
                    let data = JSON.parse(request.responseText);
                    if (request.status == 404) {
                        const response = await fetch(`https://api.open5e.com/v2/spells/${spellDocKey}`);
                        data = await response.json();
                        // const desc = await new Promise ((resolve) => {
                        //     let parseMarkdownRequest = new XMLHttpRequest();
                        //     parseMarkdownRequest.open("post", "../indexActions.php", true)
    
                        //     let markdownData = new FormData();
                        //     markdownData.append("action", "parseMarkdown");
                        //     markdownData.append("markdown", data.desc);
                        //     parseMarkdownRequest.onload = async () => {
                        //         resolve(parseMarkdownRequest.responseText);
                        //     }
                        //     parseMarkdownRequest.send(markdownData);
                        // })
                        desc = data.desc;
                        let spellData = new FormData();
                        spellData.append("action", "addSpell");
                        spellData.append("name", spell);
                        spellData.append("desc", desc);
                        spellData.append("level", data.level);
                        spellData.append("school", data.school.name);
                        spellData.append("higher_level", data.higher_level);
                        spellData.append("target_type", data.target_type);
                        spellData.append("range_text", data.range_text);
                        spellData.append("range_num", data.range);
                        spellData.append("ritual", data.ritual);
                        spellData.append("casting_time", data.casting_time);
                        spellData.append("verbal", data.verbal);
                        spellData.append("somatic", data.somatic);
                        spellData.append("material", data.material);
                        spellData.append("target_count", data.target_count);
                        spellData.append("attack_roll", data.attack_roll);
                        spellData.append("duration", data.duration);
                        spellData.append("concentration", data.concentration);
                        spellData.append("document_key", data.key);
                        data = {
                            name: spell,
                            description: desc,
                            level: data.level,
                            school: data.school?.name || '',
                            higher_level: data.higher_level || '',
                            target_type: data.target_type || '',
                            range_text: data.range_text || '',
                            range_num: data.range || 0,
                            ritual: data.ritual ? 1 : 0,
                            casting_time: data.casting_time || '',
                            verbal: data.verbal ? 1 : 0,
                            somatic: data.somatic ? 1 : 0,
                            material: data.material ? 1 : 0,
                            target_count: data.target_count || 0,
                            attack_roll: data.attack_roll ? 1 : 0,
                            duration: data.duration || '',
                            concentration: data.concentration ? 1 : 0,
                            document_key: data.key || ''
                        };
                        let addSpellRequest = new XMLHttpRequest();
                        addSpellRequest.open("post", "../indexActions.php", true);
                        addSpellRequest.send(spellData);
                    }
                    resolve(data);
                };
                request.send(formData);
            });
            
            replacements[spell] = `
            <span class="spell" data-tooltip="
            <span class='big-text'>${json.name.replace(/\b[a-z]/g, match => match.toUpperCase())}</span>
            <span class='hint-header'>
                <span>Level: ${json.level}</span>
                <span>Range: ${json.range_text}</span>
                <span>Cast Time: ${json.casting_time}</span>
            </span><br>
            ${json.description.replaceAll("\n", '<br>')}
            ${json.higher_level ? `<br><br>${json.higher_level}` : ''}
            ">
            ${spell}
            </span>`;
        })

        await Promise.all(fetches);

        const regex = new RegExp(
            "\\b(" +
            Object.keys(replacements)
                .sort((a, b) => b.length - a.length)
                .join("|") + ")\\b", "g"
        );

        html = cleanUp(html);
        html = html.replace(regex, match => replacements[match]);
    }
    spells = [];
    html = cleanUp(html);
    return html;
}

async function getMonsterInfo(monster) {
    postMonsterName = monster.name;
    if (monster.hit_dice != null) {
        minHealth = monster.hit_dice.match(/\d+/) * 1 + monster.hit_dice.match(/(?<=[\+ ])\d+/) * 1;        
        maxHealth = monster.hit_dice.match(/\d+/) * monster.hit_dice.match(/(?<=d)\d+/) * 1 + monster.hit_dice.match(/(?<=[\+ ])\d+/) * 1;        
    } else {
        minHealth = monster.hit_points;
        maxHealth = minHealth;
    }
    armorClass = monster.armor_class;
    initiativeBonus = monster.initiative_bonus;
    documentKey = monster.key;
    moreInfo = await generateHtml(monster);
    return { 'name': postMonsterName, 'minHealth': minHealth, 'maxHealth': maxHealth, 'armorClass': armorClass, 'initiativeBonus': initiativeBonus, 'documentKey': documentKey, 'moreInfo': moreInfo }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function convertStarLinesToList(text) {
    // Match blocks like: <br><br>* something<br>* another spell<br>* more
    const regex = /(<br\s*\/?>){2}\* [^<\n]+(?:<br\s*\/?>\* [^<\n]+)*/g;

    return text.replace(regex, block => {
        // Extract each line that starts with *
        const items = [...block.matchAll(/\* ([^<\n]+)/g)].map(m => m[1].trim());
        if (!items.length) return block;

        // Convert to HTML list
        return `<ul>\n${items.map(i => `  <li>${i}</li>`).join("\n")}\n</ul>`;
    });
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
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let isTooltipFreezed = false;
let spellToolTipAnimOptions = {
    duration: 200,
    fill: "forwards",
    easing: "cubic-bezier(0,.73,.17,1.11)",
}
//handle mouseover spell to show spell hint
document.addEventListener("mousemove", e => {
    let target = e.target;
    if ((target.classList.contains("spell") || target.classList.contains("condition"))&& !isTooltipFreezed) {
        let spellRect = target.getBoundingClientRect();
        let tooltipHtml = target.getAttribute("data-tooltip");
        spellTooltip.animate(
            [
                { opacity: 1 }
            ],
            spellToolTipAnimOptions
        )
        spellTooltip.innerHTML = tooltipHtml;
        let spellTooltipRect = spellTooltip.getBoundingClientRect();

        if (window.innerHeight - spellRect.bottom + spellRect.height + 10 + spellTooltipRect.height < window.innerHeight)
            spellTooltip.style.bottom = `${window.innerHeight - spellRect.bottom + spellRect.height + 10}px`;
        else
            spellTooltip.style.bottom = `${window.innerHeight - spellRect.bottom - spellTooltipRect.height - 10}px`;
        
        if (spellRect.left < spellTooltipRect.width)
            spellTooltip.style.left = `${e.clientX + 10}px`;
        else
            spellTooltip.style.left = `${e.clientX - 10 - spellTooltip.getBoundingClientRect().width}px`;

    } else if (!isTooltipFreezed) {
        spellTooltip.animate(
            [
                { opacity: 0 }
            ],
            spellToolTipAnimOptions
        )
    }
})

window.addEventListener("keydown", function (e) {
    if (e.key == "T" || e.key == "t") {
        isTooltipFreezed = !isTooltipFreezed;
    }
});