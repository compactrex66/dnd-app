const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");

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
      monsterResult.innerHTML = `<pre>${markdown}</pre>`; // Display formatted markdown
    })
    .catch(error => console.error("Error fetching data:", error));
}

function generateMarkdown(data) {
  return `
___
>## ${data.name}
>*${data.size} ${data.type}${data.subtype ? ` (${data.subtype})` : ''}, ${data.alignment}*
>___
>- **Armor Class** ${data.armor_class}
>- **Hit Points** ${data.hit_points} (${data.hit_dice})
>- **Speed** ${formatSpeed(data.speed)}
>___
>|STR|DEX|CON|INT|WIS|CHA|
>|:---:|:---:|:---:|:---:|:---:|:---:|
>|${data.strength} (${modifier(data.strength)})|${data.dexterity} (${modifier(data.dexterity)})|${data.constitution} (${modifier(data.constitution)})|${data.intelligence} (${modifier(data.intelligence)})|${data.wisdom} (${modifier(data.wisdom)})|${data.charisma} (${modifier(data.charisma)})|
>___
${formatAttributes(data)}
>___
${formatTraits(data.special_abilities)}
${formatActions(data.actions)}
${formatLegendaryActions(data.legendary_actions)}
`;
}

// Helper functions

function modifier(score) {
  let mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function formatSpeed(speed) {
  if (typeof speed === "object") {
    return Object.entries(speed).map(([key, value]) => `${key === 'walk' ? '' : key} ${value}`).join(", ");
  }
  return speed;
}

function formatAttributes(data) {
  let output = [];
  if (data.saving_throws?.length) {
    output.push(`- **Saving Throws** ${data.saving_throws.map(st => `${st.name} ${modifier(st.value)}`).join(", ")}`);
  }
  if (data.skills?.length) {
    output.push(`- **Skills** ${data.skills.map(s => `${s.name} +${s.value}`).join(", ")}`);
  }
  if (data.damage_immunities?.length) {
    output.push(`- **Damage Immunities** ${data.damage_immunities.join(", ")}`);
  }
  if (data.senses) {
    let senses = [];
    if (data.senses.blindsight) senses.push(`Blindsight ${data.senses.blindsight}`);
    if (data.senses.darkvision) senses.push(`Darkvision ${data.senses.darkvision}`);
    if (data.senses.passive_perception) senses.push(`passive Perception ${data.senses.passive_perception}`);
    output.push(`- **Senses** ${senses.join(", ")}`);
  }
  if (data.languages) {
    output.push(`- **Languages** ${data.languages}`);
  }
  if (data.challenge_rating) {
    let pb = Math.floor((data.challenge_rating + 7) / 4);
    output.push(`- **Challenge** ${data.challenge_rating} (XP ${data.xp || "Unknown"}${data.lair_xp ? `, or ${data.lair_xp} in lair` : ''}; PB +${pb})`);
  }
  return output.length ? "> " + output.join("\n> ") : "";
}

function formatTraits(traits) {
  if (!traits || !traits.length) return "";
  let output = traits.map(trait => {
    if (trait.name.toLowerCase().includes("spellcasting")) {
      return `>***${trait.name}.*** ${trait.desc.replace(/\n/g, "\n>")}\n>`;
    }
    return `>***${trait.name}.*** ${trait.desc}\n>`;
  }).join("\n");
  return output + "\n>";
}

function formatActions(actions) {
  if (!actions || !actions.length) return ">None\n>";
  let output = ">### Actions\n";
  output += actions.map(action => `>***${action.name}.*** ${action.desc}`).join("\n>\n");
  return output + "\n>";
}

function formatSection(title, data) {
  if (!data || !data.length) return "";
  return `>### ${title}\n` + data.map(item => `>***${item.name}.*** ${item.desc}`).join("\n>\n") + "\n>";
}

function formatLegendaryActions(legendaryActions) {
  if (!legendaryActions || !legendaryActions.length) return "";
  const uses = legendaryActions[0]?.usage?.times || 3;
  const lairUses = legendaryActions[0]?.lair_usage?.times || uses;
  return `
>### Legendary Actions
>*Legendary Action Uses: ${uses}${lairUses !== uses ? ` (${lairUses} in Lair)` : ''}. Immediately after another creature's turn, The ${legendaryActions[0]?.actor || "creature"} can expend a use to take one of the following actions. The ${legendaryActions[0]?.actor || "creature"} regains all expended uses at the start of each of its turns.*
>
${legendaryActions.map(action => `>- **${action.name}.** ${action.desc}`).join("\n>")}
>___
`;
}

// NEW FUNCTION TO HANDLE SPELLCASTING
function formatSpellcasting(data) {
  if (!data.special_abilities) return "";

  let spellcasting = data.special_abilities.find(trait => trait.name.toLowerCase().includes("spellcasting"));
  if (!spellcasting) return "";

  return `>### Spellcasting\n>${spellcasting.desc.replace(/\n/g, "\n>")}\n>`;
}