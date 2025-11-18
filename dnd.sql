-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 18, 2025 at 02:15 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dnd`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `character_conditions`
--

CREATE TABLE `character_conditions` (
  `id` int(11) NOT NULL,
  `condition_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `turns_left` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `character_conditions`
--

INSERT INTO `character_conditions` (`id`, `condition_id`, `character_id`, `turns_left`) VALUES
(23, 1, 1016, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `conditions`
--

CREATE TABLE `conditions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `document_key` varchar(255) NOT NULL,
  `icon_filename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conditions`
--

INSERT INTO `conditions` (`id`, `name`, `description`, `document_key`, `icon_filename`) VALUES
(1, 'Blinded', '<ul>\n<li>A blinded creature can\'t see and automatically fails any ability check that requires sight.</li>\n<li>Attack rolls against the creature have advantage, and the creature’s attack rolls have disadvantage.</li>\n</ul>', 'srd-2014', 'blinded.svg'),
(2, 'Charmed', '<ul>\n<li>A charmed creature can’t attack the charmer or target the charmer with harmful abilities or magical effects.</li>\n<li>The charmer has advantage on any ability check to interact socially with the creature.</li>\n</ul>', 'srd-2014', ''),
(3, 'Deafened', '<ul>\n<li>A deafened creature can’t hear and automatically fails any ability check that requires hearing.</li>\n</ul>', 'srd-2014', 'deafend.svg'),
(4, 'Exhaustion', '<p>Some special abilities and environmental hazards, such as starvation and the long-­‐term effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. Exhaustion is measured in six levels. An effect can give a creature one or more levels of exhaustion, as specified in the effect’s description.</p>\n<table>\n<thead>\n<tr>\n<th>Level</th>\n<th>Effect</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>Disadvantage on ability checks</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Speed halved</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Disadvantage on attack rolls and saving throws</td>\n</tr>\n<tr>\n<td>4</td>\n<td>Hit point maximum halved</td>\n</tr>\n<tr>\n<td>5</td>\n<td>Speed reduced to 0</td>\n</tr>\n<tr>\n<td>6</td>\n<td>Death</td>\n</tr>\n</tbody>\n</table>\n<p>If an already exhausted creature suffers another effect that causes exhaustion, its current level of  exhaustion increases by the amount specified in the effect’s description.\nA creature suffers the effect of its current level of exhaustion as well as all lower levels. For example, a creature suffering level 2 exhaustion has its speed halved and has disadvantage on ability checks.\nAn effect that removes exhaustion reduces its level as specified in the effect’s description, with all exhaustion effects ending if a creature’s exhaustion level is reduced below 1.\nFinishing a long rest reduces a creature’s exhaustion level by 1, provided that the creature has also  ingested some food and drink.</p>', 'srd-2014', 'exhausted.svg'),
(5, 'Frightened', '<ul>\n<li>A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.</li>\n<li>The creature can’t willingly move closer to the source of its fear.</li>\n</ul>', 'srd-2014', 'freightened.svg'),
(6, 'Grappled', '<ul>\n<li>A grappled creature’s speed becomes 0, and it can’t benefit from any bonus to its speed. </li>\n<li>The condition ends if the grappler is incapacitated (see the condition).</li>\n<li>The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the <em>thunder-­wave</em> spell.</li>\n</ul>', 'srd-2014', ''),
(7, 'Incapacitated', '<ul>\n<li>An incapacitated creature can’t take actions or reactions.</li>\n</ul>', 'srd-2014', ''),
(8, 'Invisible', '<ul>\n<li>An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature’s location can be detected by any noise it makes or any tracks it leaves.</li>\n<li>Attack rolls against the creature have disadvantage, and the creature’s attack rolls have advantage.</li>\n</ul>', 'srd-2014', 'invisible.svg'),
(9, 'Paralyzed', '<ul>\n<li>A paralyzed creature is incapacitated (see the condition) and can’t move or speak. </li>\n<li>The creature automatically fails Strength and Dexterity saving throws.</li>\n<li>Attack rolls against the creature have advantage. </li>\n<li>Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.</li>\n</ul>', 'srd-2014', ''),
(10, 'Petrified', '<ul>\n<li>A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.</li>\n<li>The creature is incapacitated (see the condition), can’t move or speak, and is unaware of its surroundings.</li>\n<li>Attack rolls against the creature have advantage.</li>\n<li>The creature automatically fails Strength and Dexterity saving throws.</li>\n<li>The creature has resistance to all damage.</li>\n<li>The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized.</li>\n</ul>', 'srd-2014', ''),
(11, 'Poisoned', '<p>A poisoned creature has disadvantage on attack rolls and ability checks.</p>', 'srd-2014', ''),
(12, 'Prone', '<ul>\n<li>A prone creature’s only movement option is to crawl, unless it stands up and thereby ends the condition.</li>\n<li>The creature has disadvantage on attack rolls. </li>\n<li>An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage.</li>\n</ul>', 'srd-2014', 'prone.svg'),
(13, 'Restrained', '<ul>\n<li>A restrained creature’s speed becomes 0, and it can’t benefit from any bonus to its speed.</li>\n<li>Attack rolls against the creature have advantage, and the creature’s attack rolls have disadvantage.</li>\n<li>The creature has disadvantage on Dexterity saving throws.</li>\n</ul>', 'srd-2014', ''),
(14, 'Stunned', '<ul>\n<li>A stunned creature is incapacitated (see the condition), can’t move, and can speak only falteringly.</li>\n<li>The creature automatically fails Strength and Dexterity saving throws.</li>\n<li>Attack rolls against the creature have advantage.</li>\n</ul>', 'srd-2014', 'stunned.svg'),
(15, 'Unconscious', '<ul>\n<li>An unconscious creature is incapacitated (see the condition), can’t move or speak, and is unaware of its surroundings</li>\n<li>The creature drops whatever it’s holding and falls prone.</li>\n<li>The creature automatically fails Strength and Dexterity saving throws.</li>\n<li>Attack rolls against the creature have advantage.</li>\n<li>Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.</li>\n</ul>', 'srd-2014', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `current_fight`
--

CREATE TABLE `current_fight` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `health` int(11) NOT NULL,
  `max_health` int(11) NOT NULL,
  `AC` int(11) NOT NULL,
  `initiative` int(11) NOT NULL,
  `is_player` tinyint(1) NOT NULL,
  `enemy_id` int(11) DEFAULT NULL,
  `current` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `current_fight`
--

INSERT INTO `current_fight` (`id`, `name`, `health`, `max_health`, `AC`, `initiative`, `is_player`, `enemy_id`, `current`) VALUES
(1, 'John\r\nBarbarian', 15, 50, 16, 13, 1, NULL, 0),
(2, 'Bob', 49, 50, 21, 13, 1, NULL, 0),
(3, 'Godfrey', 7, 67, 14, 5, 1, NULL, 0),
(1017, 'Mage1', 65, 65, 12, 12, 0, 72, 1),
(1018, 'Knight2', 43, 43, 18, 11, 0, 71, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `enemies`
--

CREATE TABLE `enemies` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `min_health` int(11) NOT NULL,
  `max_health` int(11) NOT NULL,
  `AC` int(11) NOT NULL,
  `initiative_bonus` int(11) NOT NULL,
  `document_key` tinytext NOT NULL,
  `more_info` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enemies`
--

INSERT INTO `enemies` (`id`, `name`, `min_health`, `max_health`, `AC`, `initiative_bonus`, `document_key`, `more_info`) VALUES
(71, 'Knight', 24, 80, 18, 0, 'srd-2024_knight', '\r\n    <blockquote>\r\n        <h2>Knight</h2>\r\n        <p>\r\n            <em>Small Humanoid, neutral</em>\r\n        </p>\r\n        <ul>\r\n            <li>\r\n                <strong>Armor Class </strong>\r\n                18  (natural armor)\r\n            </li>\r\n            <li>\r\n                <strong>Hit Points </strong>\r\n                52 (8d8 + 16)\r\n            </li>\r\n            <li>\r\n                <strong>Speed </strong>\r\n                30   feet\r\n            </li>\r\n            <li>\r\n                <strong>Initiative </strong>\r\n                +0\r\n            </li>\r\n        </ul>\r\n        <div class=\"inline-row\">\r\n            <table>\r\n                <tr>\r\n                    <th colspan=\"2\"></th>\r\n                    <th>MOD</th>\r\n                    <th>SAVE</th>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Str</strong></td>\r\n                    <td>16</td>\r\n                    <td>+3</td>\r\n                    <td>+3</td>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Int</strong></td>\r\n                    <td>11</td>\r\n                    <td>+0</td>\r\n                    <td>+0</td>\r\n                </tr>\r\n            </table>\r\n            <table>\r\n                <tr>\r\n                    <th colspan=\"2\"></th>\r\n                    <th>MOD</th>\r\n                    <th>SAVE</th>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Dex</strong></td>\r\n                    <td>11</td>\r\n                    <td>+0</td>\r\n                    <td>+0</td>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Wis</strong></td>\r\n                    <td>11</td>\r\n                    <td>+0</td>\r\n                    <td>+2</td>\r\n                </tr>\r\n            </table>\r\n            <table>\r\n                <tr>\r\n                    <th colspan=\"2\"></th>\r\n                    <th>MOD</th>\r\n                    <th>SAVE</th>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Con</strong></td>\r\n                    <td>14</td>\r\n                    <td>+2</td>\r\n                    <td>+4</td>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Cha</strong></td>\r\n                    <td>15</td>\r\n                    <td>+2</td>\r\n                    <td>+2</td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n        <ul>\r\n            \r\n            <li>\r\n                <strong>Senses </strong>\r\n                \r\n                \r\n                \r\n                \r\n                Passive Perception 10\r\n            </li>\r\n            <li>\r\n                <strong>Languages </strong>\r\n                Common plus one other language\r\n            </li>\r\n            <li>\r\n                <strong>Challenge </strong>\r\n                3 (XP 700; PB +0)\r\n            </li>\r\n        </ul>\r\n        \r\n        \r\n        \r\n        <h3>Actions</h3>\r\n        <p><strong><em>Greatsword. </em></strong>Melee Attack Roll: +5, reach 5 ft. 10 (2d6 + 3) Slashing damage plus 4 (1d8) Radiant damage.</p><p><strong><em>Heavy Crossbow. </em></strong>Ranged Attack Roll: +2, range 100/400 ft. 11 (2d10) Piercing damage plus 4 (1d8) Radiant damage.</p><p><strong><em>Multiattack. </em></strong>The knight makes two attacks, using Greatsword or Heavy Crossbow in any combination.</p>\r\n\r\n        \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        <br>\r\n    </blockquote>\r\n    '),
(72, 'Mage', 9, 72, 12, 2, 'srd_mage', '\r\n    <blockquote>\r\n        <h2>Mage</h2>\r\n        <p>\r\n            <em>Medium Humanoid, any alignment</em>\r\n        </p>\r\n        <ul>\r\n            <li>\r\n                <strong>Armor Class </strong>\r\n                12  (15 with \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Mage Armor</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 1</span>\r\n                <span>Range: Touch</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            Until the spell ends, the target is protected by a shimmering magical force. Its AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor, or if you use an action to dismiss it.\r\n            <br><br>The target gains 5 temporary hit points for each slot level above 1st. The temporary hit points last for the spell\'s duration.\r\n            \">\r\n            mage armor\r\n            </span>)\r\n            </li>\r\n            <li>\r\n                <strong>Hit Points </strong>\r\n                40 (9d8)\r\n            </li>\r\n            <li>\r\n                <strong>Speed </strong>\r\n                30   feet\r\n            </li>\r\n            <li>\r\n                <strong>Initiative </strong>\r\n                +2\r\n            </li>\r\n        </ul>\r\n        <div class=\"inline-row\">\r\n            <table>\r\n                <tr>\r\n                    <th colspan=\"2\"></th>\r\n                    <th>MOD</th>\r\n                    <th>SAVE</th>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Str</strong></td>\r\n                    <td>9</td>\r\n                    <td>-1</td>\r\n                    <td>-1</td>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Int</strong></td>\r\n                    <td>17</td>\r\n                    <td>+3</td>\r\n                    <td>+6</td>\r\n                </tr>\r\n            </table>\r\n            <table>\r\n                <tr>\r\n                    <th colspan=\"2\"></th>\r\n                    <th>MOD</th>\r\n                    <th>SAVE</th>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Dex</strong></td>\r\n                    <td>14</td>\r\n                    <td>+2</td>\r\n                    <td>+2</td>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Wis</strong></td>\r\n                    <td>12</td>\r\n                    <td>+1</td>\r\n                    <td>+4</td>\r\n                </tr>\r\n            </table>\r\n            <table>\r\n                <tr>\r\n                    <th colspan=\"2\"></th>\r\n                    <th>MOD</th>\r\n                    <th>SAVE</th>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Con</strong></td>\r\n                    <td>11</td>\r\n                    <td>+0</td>\r\n                    <td>+0</td>\r\n                </tr>\r\n                <tr>\r\n                    <td><strong>Cha</strong></td>\r\n                    <td>11</td>\r\n                    <td>+0</td>\r\n                    <td>+0</td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n        <ul><li>\r\n                    <strong>Skills </strong>\r\n                    arcana +6, history +6\r\n                </li>\r\n            \r\n            <li>\r\n                <strong>Senses </strong>\r\n                \r\n                \r\n                \r\n                \r\n                Passive Perception 11\r\n            </li>\r\n            <li>\r\n                <strong>Languages </strong>\r\n                any four languages\r\n            </li>\r\n            <li>\r\n                <strong>Challenge </strong>\r\n                6 (XP 2300; PB +0)\r\n            </li>\r\n        </ul>\r\n        <h3>Traits</h3>\r\n        <p><strong><em>Spellcasting. </em></strong>The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:<br><br>* Cantrips (at will): \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Fire Bolt</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 0</span>\r\n                <span>Range: 120 feet</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            You cast a streak of flame at the target. Make a ranged spell attack. On a hit, you deal 1d10 fire damage. An unattended flammable object is ignited.\r\n            <br><br>This spell\'s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).\r\n            \">\r\n            fire bolt\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Light</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 0</span>\r\n                <span>Range: Touch</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            Until the spell ends, the target emits bright light in a 20-foot radius and dim light an additional 20 feet. Light emanating from the target may be any color. Completely covering the target with something that is not transparent blocks the light. The spell ends when you use an action to dismiss it or if you cast it again.\r\n            \r\n            \">\r\n            light\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Mage Hand</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 0</span>\r\n                <span>Range: 30 feet</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            A faintly shimmering phantasmal hand appears at a point you choose within range. It remains until you dismiss it as an action, or until you move more than 30 feet from it.\r\n<br>\r\n<br>You can use an action to control the hand and direct it to do any of the following:\r\n<br>\r\n<br>* manipulate an object.\r\n<br>* open an unlocked container or door.\r\n<br>* stow or retrieve items from unlocked containers.\r\n<br>\r\n<br>The hand cannot attack, use magic items, or carry more than 10 pounds.\r\n            \r\n            \">\r\n            mage hand\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Prestidigitation</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 0</span>\r\n                <span>Range: 30 feet</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            You wield arcane energies to produce minor effects. Choose one of the following:\r\n<br>\r\n<br>* create a single burst of magic that manifests to one of the senses (for example a burst of sound, sparks, or an odd odor).\r\n<br>* clean or soil an object of 1 cubic foot or less.\r\n<br>* light or snuff a flame.\r\n<br>* chill, warm, or flavor nonliving material of 1 cubic foot or less for 1 hour.\r\n<br>* color or mark an object or surface for 1 hour.\r\n<br>* create an ordinary trinket or illusionary image that fits in your hand and lasts for 1 round.\r\n<br>\r\n<br>You may cast this spell multiple times, though only three effects may be active at a time. Dismissing each effect requires an action.\r\n            \r\n            \">\r\n            prestidigitation\r\n            </span><br><br>* 1st level (4 slots): \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Detect Magic</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 1</span>\r\n                <span>Range: 30 feet</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            Until the spell ends, you automatically sense the presence of magic within range, and you can use an action to study the aura of a magic effect to learn its schools of magic (if any).\r\n<br>\r\n<br>The spell penetrates most barriers but is blocked by 3 feet of wood or dirt, 1 foot of stone, 1 inch of common metal, or a thin sheet of lead.\r\n            <br><br>When using a 2nd-level spell slot or higher, the spell no longer requires your concentration. When using a 3rd-level spell slot or higher, the duration increases to 1 hour. When using a 4th-level spell slot or higher, the duration increases to 8 hours.\r\n            \">\r\n            detect magic\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Mage Armor</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 1</span>\r\n                <span>Range: Touch</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            Until the spell ends, the target is protected by a shimmering magical force. Its AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor, or if you use an action to dismiss it.\r\n            <br><br>The target gains 5 temporary hit points for each slot level above 1st. The temporary hit points last for the spell\'s duration.\r\n            \">\r\n            mage armor\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Magic Missile</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 1</span>\r\n                <span>Range: 120 feet</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            A trio of glowing darts of magical force unerringly and simultaneously strike the targets, each dealing 1d4+1 force damage.\r\n            <br><br>Evoke one additional dart and target up to one additional creature for each slot level above 1st.\r\n            \">\r\n            magic missile\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Shield</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 1</span>\r\n                <span>Range: Self</span>\r\n                <span>Cast Time: reaction</span>\r\n            </span><br>\r\n            You create a shimmering arcane barrier between yourself and an oncoming attack. Until the spell ends, you gain a +5 bonus to your AC (including against the triggering attack) and any magic missile targeting you is harmlessly deflected.\r\n            \r\n            \">\r\n            shield\r\n            </span><br><br>* 2nd level (3 slots): \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Misty Step</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 2</span>\r\n                <span>Range: 30 feet</span>\r\n                <span>Cast Time: bonus-action</span>\r\n            </span><br>\r\n            You teleport to an unoccupied space that you can see, disappearing and reappearing in a swirl of shimmering mist.\r\n            \r\n            \">\r\n            misty step\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Suggestion</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 2</span>\r\n                <span>Range: 30 feet</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            Creatures that cannot be charmed are immune to this spell. Suggest an activity phrased in a sentence or two. The target is magically influenced to follow that course of activity. The suggestion must be worded to sound reasonable. Asking the target to perform an action that is obviously harmful to it ends the spell.\r\n<br>\r\n<br>The target carries out the activity suggested by you as well as it can. The activity can last for the duration of the spell, and if it requires less time the spell ends after the target has carried out the activity.\r\n<br>\r\n<br>You may specify trigger conditions that cause the target to perform a specific activity while the spell lasts. For example, you may suggest that the target takes off its clothes and dives the next time it sees a body of water. If the target does not see a body of water before the spell ends, the specific activity isn\'t performed.\r\n<br>\r\n<br>Any damage done to the target by you or an ally ends the spell for that creature.\r\n            <br><br>When using a 4th-level spell slot, the duration is concentration, up to 24 hours. When using a 5th-level spell slot, the duration is 7 days. When using a 7th-level spell slot, the duration is 1 year. When using a 9th-level spell slot, the suggestion lasts until it is dispelled.\r\n\r\nAny use of a 5th-level or higher spell slot grants a duration that doesn\'t require concentration.\r\n            \">\r\n            suggestion\r\n            </span><br><br>* 3rd level (3 slots): \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Counterspell</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 3</span>\r\n                <span>Range: 60 feet</span>\r\n                <span>Cast Time: reaction</span>\r\n            </span><br>\r\n            You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 2nd-level or lower, its spell fails and has no effect.\r\n<br>\r\n<br>If it is casting a spell of 3rd-level or higher, make an ability check using your spellcasting ability (DC 10 + the spell\'s level). On a success, the creature\'s spell fails and has no effect, but the creature can use its reaction to reshape the fraying magic and cast another spell with the same casting time as the original spell.\r\n<br>\r\n<br>This new spell must be cast at a spell slot level equal to or less than half the original spell slot.\r\n            <br><br>The interrupted spell has no effect if its level is less than the level of the spell slot used to cast this spell, or if both spells use the same level spell slot an opposed spellcasting ability check is made.\r\n            \">\r\n            counterspell\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Fireball</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 3</span>\r\n                <span>Range: 120 feet</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            A fiery mote streaks to a point within range and explodes in a burst of flame. The fire spreads around corners and ignites unattended flammable objects. Each creature in the area takes 6d6 fire damage.\r\n            <br><br>The damage increases by 1d6 for each slot level above 3rd.\r\n            \">\r\n            fireball\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Fly</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 3</span>\r\n                <span>Range: Touch</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            The target gains a flying speed of 60 feet. When the spell ends, the target falls if it is off the ground.\r\n            <br><br>Target one additional creature for each slot level above 3rd.\r\n            \">\r\n            fly\r\n            </span><br><br>* 4th level (3 slots): \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Greater Invisibility</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 4</span>\r\n                <span>Range: Touch</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            The target is invisible. Anything the target is carrying or wearing is also invisible as long as it remains in the target\'s possession.\r\n            \r\n            \">\r\n            greater invisibility\r\n            </span>, \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Ice Storm</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 4</span>\r\n                <span>Range: 300 feet</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            A bombardment of jagged ice erupts throughout the target area. All creatures in the area take 2d8 bludgeoning damage and 4d6 cold damage. Large chunks of ice turn the area into difficult terrain until the end of your next turn.\r\n            <br><br>The bludgeoning damage increases by 1d8 for each slot level above 4th.\r\n            \">\r\n            ice storm\r\n            </span><br><br>* 5th level (1 slot): \r\n            <span class=\"spell\" data-tooltip=\"\r\n            <span class=\'big-text\'><b>Cone Of Cold</b></span>\r\n            <span class=\'hint-header\'>\r\n                <span>Level: 5</span>\r\n                <span>Range: Self</span>\r\n                <span>Cast Time: action</span>\r\n            </span><br>\r\n            Frigid cold blasts from your hands. Each creature in the area takes 8d8 cold damage. Creatures killed by this spell become frozen statues until they thaw.\r\n            <br><br>The damage increases by 1d8 for each slot level above 5th.\r\n            \">\r\n            cone of cold\r\n            </span></p>\r\n        \r\n        <h3>Actions</h3>\r\n        <p><strong><em>Dagger. </em></strong>Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage.</p>\r\n\r\n        \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        \r\n        <br>\r\n    </blockquote>\r\n    ');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `spells`
--

CREATE TABLE `spells` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `description` text NOT NULL,
  `level` tinyint(3) UNSIGNED NOT NULL,
  `school` tinytext NOT NULL,
  `higher_level` text NOT NULL,
  `target_type` tinytext NOT NULL,
  `range_text` tinytext NOT NULL,
  `range_num` int(11) NOT NULL,
  `ritual` tinyint(1) NOT NULL,
  `casting_time` tinytext NOT NULL,
  `verbal` tinyint(1) NOT NULL,
  `somatic` tinyint(1) NOT NULL,
  `material` tinytext NOT NULL,
  `target_count` tinyint(3) UNSIGNED NOT NULL,
  `attack_roll` tinyint(1) NOT NULL,
  `duration` tinytext NOT NULL,
  `concentration` tinyint(1) NOT NULL,
  `document_key` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spells`
--

INSERT INTO `spells` (`id`, `name`, `description`, `level`, `school`, `higher_level`, `target_type`, `range_text`, `range_num`, `ritual`, `casting_time`, `verbal`, `somatic`, `material`, `target_count`, `attack_roll`, `duration`, `concentration`, `document_key`) VALUES
(17, 'Mage Armor', 'Until the spell ends, the target is protected by a shimmering magical force. Its AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor, or if you use an action to dismiss it.', 1, 'Abjuration', 'The target gains 5 temporary hit points for each slot level above 1st. The temporary hit points last for the spell\'s duration.', 'creature', 'Touch', 0, 0, 'action', 0, 0, '0', 1, 0, '8 hours', 0, 'a5e-ag_mage-armor'),
(18, 'Detect Thoughts', 'On the round you cast it, and as an action on subsequent turns until the spell ends, you can probe a creature\'s mind to read its thoughts by focusing on one creature you can see within range. The creature makes a Wisdom saving throw. Creatures with an Intelligence score of 3 or less or that don\'t speak any languages are unaffected. On a failed save, you learn the creature\'s surface thoughts —what is most on its mind in that moment. On a successful save, you fail to read the creature\'s thoughts and can\'t attempt to probe its mind for the duration. Conversation naturally shapes the course of a creature\'s thoughts and what it is thinking about may change based on questions verbally directed at it.\r\n\r\nOnce you have read a creature\'s surface thoughts, you can use an action to probe deeper into its mind. The creature makes a second Wisdom saving throw. On a successful save, you fail to read the creature\'s deeper thoughts and the spell ends. On a failure, you gain insight into the creature\'s motivations, emotional state, and something that looms large in its mind.\r\n\r\nThe creature then becomes aware you are probing its mind and can use an action to make an Intelligence check contested by your Intelligence check, ending the spell if it succeeds.\r\n\r\nAdditionally, you can use an action to scan for thinking creatures within range that you can\'t see.\r\n\r\nOnce you detect the presence of a thinking creature, so long as it remains within range you can attempt to read its thoughts as described above (even if you can\'t see it).\r\n\r\nThe spell penetrates most barriers but is blocked by 2 feet of stone, 2 inches of common metal, or a thin sheet of lead.', 2, 'Divination', 'When using a 5th-level spell slot, increase the spell\'s range to 1 mile. When using a 7th-level spell slot, increase the range to 10 miles.\r\n\r\nWhen using a 9th-level spell slot, increase the range to 1, 000 miles.', 'creature', '30 feet', 30, 0, 'action', 0, 0, '0', 1, 0, '1 minute', 0, 'a5e-ag_detect-thoughts'),
(19, 'Lightning Bolt', 'A bolt of lightning arcs out from you in a direction you choose. Each creature in the area takes 8d6 lightning damage. The lightning ignites flammable objects in its path that aren\'t worn or carried by another creature.\r\n\r\nIf the spell is stopped by an object at least as large as its width, it ends there unless it deals enough damage to break through. When it does, it continues to the end of its area.', 3, 'Evocation', 'Damage increases by 1d6 for every slot level above 3rd.', 'creature', 'Self', 0, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_lightning-bolt'),
(20, 'Mage Hand', 'A faintly shimmering phantasmal hand appears at a point you choose within range. It remains until you dismiss it as an action, or until you move more than 30 feet from it.\r\n\r\nYou can use an action to control the hand and direct it to do any of the following:\r\n\r\n* manipulate an object.\r\n* open an unlocked container or door.\r\n* stow or retrieve items from unlocked containers.\r\n\r\nThe hand cannot attack, use magic items, or carry more than 10 pounds.', 0, 'Conjuration', '', 'point', '30 feet', 30, 0, 'action', 0, 0, '0', 1, 0, '1 minute', 0, 'a5e-ag_mage-hand'),
(21, 'Detect Magic', 'Until the spell ends, you automatically sense the presence of magic within range, and you can use an action to study the aura of a magic effect to learn its schools of magic (if any).\r\n\r\nThe spell penetrates most barriers but is blocked by 3 feet of wood or dirt, 1 foot of stone, 1 inch of common metal, or a thin sheet of lead.', 1, 'Divination', 'When using a 2nd-level spell slot or higher, the spell no longer requires your concentration. When using a 3rd-level spell slot or higher, the duration increases to 1 hour. When using a 4th-level spell slot or higher, the duration increases to 8 hours.', 'creature', '30 feet', 30, 0, 'action', 0, 0, '0', 1, 0, '10 minutes', 0, 'a5e-ag_detect-magic'),
(22, 'Fly', 'The target gains a flying speed of 60 feet. When the spell ends, the target falls if it is off the ground.', 3, 'Transmutation', 'Target one additional creature for each slot level above 3rd.', 'creature', 'Touch', 0, 0, 'action', 0, 0, '0', 1, 0, '10 minutes', 0, 'a5e-ag_fly'),
(23, 'Invisibility', 'You wreathe a creature in an illusory veil, making it invisible. Anything the target is carrying or wearing is also invisible as long as it remains in the target\'s possession. The spell\'s effects end for a target that attacks or casts a spell.', 2, 'Illusion', 'Target one additional creature for each slot level above 2nd.', 'creature', 'Touch', 0, 0, 'action', 0, 0, '0', 1, 0, '1 hour', 0, 'a5e-ag_invisibility'),
(24, 'Prestidigitation', 'You wield arcane energies to produce minor effects. Choose one of the following:\r\n\r\n* create a single burst of magic that manifests to one of the senses (for example a burst of sound, sparks, or an odd odor).\r\n* clean or soil an object of 1 cubic foot or less.\r\n* light or snuff a flame.\r\n* chill, warm, or flavor nonliving material of 1 cubic foot or less for 1 hour.\r\n* color or mark an object or surface for 1 hour.\r\n* create an ordinary trinket or illusionary image that fits in your hand and lasts for 1 round.\r\n\r\nYou may cast this spell multiple times, though only three effects may be active at a time. Dismissing each effect requires an action.', 0, 'Transmutation', '', 'object', '30 feet', 30, 0, 'action', 0, 0, '0', 1, 0, '1 hour', 0, 'a5e-ag_prestidigitation'),
(25, 'Scrying', 'You can see and hear a specific creature that you choose. The difficulty of the saving throw for this spell is modified by your knowledge of the target and whether you possess a physical item with a connection to the target.\r\n\r\nOn a failed save, you can see and hear the target through an invisible sensor that appears within 10 feet of it and moves with the target. Any creature who can see invisibility or rolls a critical success on its saving throw perceives the sensor as a fist-sized glowing orb hovering in the air. Creatures cannot see or hear you through the sensor.\r\n\r\nIf you choose to target a location, the sensor appears at that location and is immobile.', 5, 'Divination', '', 'creature', 'Self', 0, 0, '10minutes', 0, 0, '0', 1, 0, '10 minutes', 0, 'a5e-ag_scrying'),
(26, 'Disguise Self', 'Until the spell ends or you use an action to dismiss it, you and your gear are cloaked by an illusory disguise that makes you appear like another creature of your general size and body type, including but not limited to: your heritage, 1 foot of height, weight, clothing, tattoos, piercings, facial features, hair style and length, skin and eye coloration, sex, and any other distinguishing features. You cannot disguise yourself as a creature of a different size category, and your limb structure remains the same; for example if you\'re bipedal, you can\'t use this spell to appear as a quadruped.\r\n\r\nThe disguise does not hold up to physical inspection. A creature that tries to grab an illusory hat, for example, finds its hand passes straight through the figment. To see through your disguise without such an inspection, a creature must use its action to make an Investigation check against your spell save DC.', 1, 'Illusion', 'When using a 3rd-level spell slot or higher, this spell functions identically to the seeming spell, except the spell\'s duration is 10 minutes.', 'creature', 'Self', 0, 0, 'action', 0, 0, '0', 1, 0, '1 hour', 0, 'a5e-ag_disguise-self'),
(27, 'Teleport', 'You teleport the targets instantly across vast distances. When you cast this spell, choose a destination. You must know the location you\'re teleporting to, and it must be on the same plane of existence.\r\n\r\nTeleportation is difficult magic and you may arrive off-target or somewhere else entirely depending on how familiar you are with the location you\'re teleporting to. When you teleport, the Narrator rolls 1d100 and consults Table: Teleport Familiarity.\r\n\r\nFamiliarity is determined as follows: Permanent Circle: A permanent teleportation circle whose sigil sequence you know (see teleportation circle).\r\n\r\nAssociated Object: You have an object taken from the target location within the last 6 months, such as a piece of wood from the pew in a grand temple or a pinch of grave dust from a vampire\'s hidden redoubt.\r\n\r\nVery Familiar: A place you have frequented, carefully studied, or can see at the time you cast the spell.\r\n\r\nSeen Casually: A place you have seen more than once but don\'t know well. This could be a castle you\'ve passed by but never visited, or the farms you look down on from your tower of ivory.\r\n\r\nViewed Once: A place you have seen once, either in person or via magic.\r\n\r\nDescription: A place you only know from someone else\'s description (whether spoken, written, or even marked on a map).\r\n\r\nFalse Destination: A place that doesn\'t actually exist. This typically happens when someone deceives you, either intentionally (like a wizard creating an illusion to hide their actual tower) or unintentionally (such as when the location you attempt to teleport to no longer exists).\r\n\r\nYour arrival is determined as follows: On Target: You and your targets arrive exactly where you mean to.\r\n\r\nOff Target: You and your targets arrive some distance away from the target in a random direction. The further you travel, the further away you are likely to arrive. You arrive off target by a number of miles equal to 1d10 × 1d10 percent of the total distance of your trip.\r\n\r\nIf you tried to travel 1, 000 miles and roll a 2 and 4 on the d10s, you land 6 percent off target and arrive 60 miles away from your intended destination in a random direction. Roll 1d8 to randomly determine the direction: 1—north, 2 —northeast, 3 —east, 4 —southeast, 5—south, 6 —southwest, 7—west, 8—northwest.\r\n\r\nSimilar Location: You and your targets arrive in a different location that somehow resembles the target area. If you tried to teleport to your favorite inn, you might end up at a different inn, or in a room with much of the same decor.\r\n\r\nTypically you appear at the closest similar location, but that is not always the case.\r\n\r\nMishap: The spell\'s magic goes awry, and each teleporting creature or object takes 3d10 force damage. The Narrator rerolls on the table to determine where you arrive. When multiple mishaps occur targets take damage each time.', 7, 'Conjuration', '', 'object', 'Special', 0, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_teleport'),
(28, 'Cone of Cold', 'Frigid cold blasts from your hands. Each creature in the area takes 8d8 cold damage. Creatures killed by this spell become frozen statues until they thaw.', 5, 'Evocation', 'The damage increases by 1d8 for each slot level above 5th.', 'creature', 'Self', 0, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_cone-of-cold'),
(29, 'Mind Blank', 'The target is immune to psychic damage, any effect that would read its emotions or thoughts, divination spells, and the charmed condition.\r\n\r\nThis immunity extends even to the wish spell, and magical effects or spells of similar power that would affect the target\'s mind or gain information about it.', 8, 'Abjuration', '', 'creature', 'Touch', 0, 0, 'action', 0, 0, '0', 1, 0, '24 hours', 0, 'a5e-ag_mind-blank'),
(30, 'Light', 'Until the spell ends, the target emits bright light in a 20-foot radius and dim light an additional 20 feet. Light emanating from the target may be any color. Completely covering the target with something that is not transparent blocks the light. The spell ends when you use an action to dismiss it or if you cast it again.', 0, 'Evocation', '', 'object', 'Touch', 0, 0, 'action', 0, 0, '0', 1, 0, '1 hour', 0, 'a5e-ag_light'),
(31, 'identify', 'You learn the target item\'s magical properties along with how to use them. This spell also reveals whether or not a targeted item requires attunement and how many charges it has. You learn what spells are affecting the targeted item (if any) along with what spells were used to create it.\r\n\r\nAlternatively, you learn any spells that are currently affecting a targeted creature.\r\n\r\nWhat this spell can reveal is at the Narrator\'s discretion, and some powerful and rare magics are immune to identify.', 1, 'Divination', '', 'object', 'Touch', 0, 0, '1minute', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_identify'),
(32, 'fire bolt', 'You cast a streak of flame at the target. Make a ranged spell attack. On a hit, you deal 1d10 fire damage. An unattended flammable object is ignited.', 0, 'Evocation', 'This spell\'s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).', 'object', '120 feet', 120, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_fire-bolt'),
(33, 'magic missile', 'A trio of glowing darts of magical force unerringly and simultaneously strike the targets, each dealing 1d4+1 force damage.', 1, 'Evocation', 'Evoke one additional dart and target up to one additional creature for each slot level above 1st.', 'creature', '120 feet', 120, 0, 'action', 0, 0, '0', 3, 0, 'instantaneous', 0, 'a5e-ag_magic-missile'),
(34, 'globe of invulnerability', 'An immobile, glimmering sphere forms around you. Any spell of 5th-level or lower cast from outside the sphere can\'t affect anything inside the sphere, even if it\'s cast with a higher level spell slot. Targeting something inside the sphere or including the globe\'s space in an area has no effect on anything inside.', 6, 'Abjuration', 'The barrier blocks spells of one spell slot level higher for each slot level above 6th.', 'area', 'Self', 0, 0, 'action', 0, 0, '0', 1, 0, '1 minute', 0, 'a5e-ag_globe-of-invulnerability'),
(35, 'fire shield', 'Until the spell ends, flames envelop your body, casting bright light in a 10-foot radius and dim light for an additional 10 feet. You can use an action to end the spell early. Choose one of the following options:\r\n\r\n* **Chill Shield:** You have resistance to fire damage. A creature within 5 feet of you takes 2d8 cold damage when it hits you with a melee attack.\r\n* **Warm Shield:** You have resistance to cold damage. A creature within 5 feet of you takes 2d8 fire damage when it hits you with a melee attack.', 4, 'Evocation', 'The duration increases to 1 hour when using a 6th-level spell slot, or 8 hours when using an 8th-level spell slot.', 'creature', 'Self', 0, 0, 'action', 0, 0, '0', 1, 0, '10 minutes', 0, 'a5e-ag_fire-shield'),
(36, 'mirror image', 'A total of 3 illusory copies of yourself appear in your space. For the duration, these copies move with you and mimic your actions, creating confusion as to which is real.\r\n\r\nYou can use an action to dismiss them.\r\n\r\nEach time you\'re targeted by a creature\'s attack, roll a d20 to see if it targets you or one of your copies.\r\n\r\nWith 3 copies, a roll of 6 or higher means a copy is targeted. With two copies, a roll of 8 or higher targets a copy, and with 1 copy a roll of 11 or higher targets the copy.\r\n\r\nA copy\'s AC is 10 + your Dexterity modifier, and when it is hit by an attack a copy is destroyed.\r\n\r\nIt may be destroyed only by an attack that hits it.\r\n\r\nAll other damage and effects have no impact.\r\n\r\nAttacking creatures that have truesight, cannot see, have blindsight, or rely on other nonvisual senses are unaffected by this spell.', 2, 'Illusion', 'When using a 5th-level spell slot, the duration increases to concentration (1 hour).', 'creature', 'Self', 0, 0, 'action', 0, 0, '0', 1, 0, '1 minute', 0, 'a5e-ag_mirror-image'),
(37, 'banishment', 'You employ sheer force of will to make reality question the existence of a nearby creature, causing them to warp visibly in front of you.\r\n\r\nUntil the spell ends, a target native to your current plane is banished to a harmless demiplane and incapacitated. At the end of the duration the target reappears in the space it left (or the nearest unoccupied space). A target native to a different plane is instead banished to its native plane.\r\n\r\nAt the end of each of its turns, a banished creature can repeat the saving throw with a -1 penalty for each round it has spent banished, returning on a success. If the spell ends before its maximum duration, the target reappears in the space it left (or the nearest unoccupied space) but otherwise a target native to a different plane doesn\'t return.', 4, 'Abjuration', 'The duration of banishment increases by 1 round for each slot level above 4th.', 'creature', '60 feet', 60, 0, 'action', 0, 0, '0', 1, 0, '1d4+2 rounds', 0, 'a5e-ag_banishment'),
(38, 'wall of force', 'You create an invisible wall of force at a point you choose. The wall is a horizontal or vertical barrier, or at an angle. It can be free floating or resting on a solid surface. You can form it into a hemispherical dome or a sphere, either with a radius of up to 10 feet. You may also choose to create a flat surface made up of a contiguous group of ten 10-foot square sections. The wall is 1/4 inch thick.\r\n\r\nIf the wall enters a creature\'s space when it appears, the creature is pushed to one side of the wall (your choice), but when a creature would be surrounded on all sides by the wall (or the wall and another solid surface), it can use its reaction to make a Dexterity saving throw to move up to its Speed to escape. Any creature without a special sense like blindsight has disadvantage on this saving throw.\r\n\r\nNothing can physically pass through the wall.\r\n\r\nIt can be destroyed with dispel magic cast using a spell slot of at least 5th-level or by being dealt at least 25 force damage at once. It is otherwise immune to damage. The wall also extends into the Ethereal Plane, blocking ethereal travel through it.', 5, 'Evocation', '', 'point', '120 feet', 120, 0, 'action', 0, 0, '0', 1, 0, '10 minutes', 0, 'a5e-ag_wall-of-force'),
(39, 'misty step', 'You teleport to an unoccupied space that you can see, disappearing and reappearing in a swirl of shimmering mist.', 2, 'Conjuration', '', 'point', '30 feet', 30, 0, 'bonus-action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_misty-step'),
(40, 'time stop', 'You stop time, granting yourself extra time to take actions. When you cast the spell, the world is frozen in place while you take 1d4 + 1 turns in a row, during which you can use actions and move as normal.\r\n\r\nThe spell ends if you move more than 1, 000 feet from where you cast the spell, or if you affect either a creature other than yourself or an object worn or carried by someone else.', 9, 'Transmutation', '', 'creature', 'Self', 0, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_time-stop'),
(41, 'stoneskin', 'Until the spell ends, the target\'s flesh becomes as hard as stone and it gains resistance to nonmagical bludgeoning, piercing, and slashing damage.', 4, 'Abjuration', 'When using a 7th-level spell slot, the target gains resistance to magical bludgeoning, piercing, and slashing damage.', 'creature', 'Touch', 0, 0, 'action', 0, 0, '0', 1, 0, '1 hour', 0, 'a5e-ag_stoneskin'),
(42, 'shocking grasp', 'Electricity arcs from your hand to shock the target. Make a melee spell attack (with advantage if the target is wearing armor made of metal). On a hit, you deal 1d8 lightning damage, and the target can\'t take reactions until the start of its next turn as the electricity courses through its body.', 0, 'Evocation', 'This spell\'s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).', 'creature', 'Touch', 0, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_shocking-grasp'),
(43, 'counterspell', 'You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 2nd-level or lower, its spell fails and has no effect.\r\n\r\nIf it is casting a spell of 3rd-level or higher, make an ability check using your spellcasting ability (DC 10 + the spell\'s level). On a success, the creature\'s spell fails and has no effect, but the creature can use its reaction to reshape the fraying magic and cast another spell with the same casting time as the original spell.\r\n\r\nThis new spell must be cast at a spell slot level equal to or less than half the original spell slot.', 3, 'Abjuration', 'The interrupted spell has no effect if its level is less than the level of the spell slot used to cast this spell, or if both spells use the same level spell slot an opposed spellcasting ability check is made.', 'creature', '60 feet', 60, 0, 'reaction', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_counterspell'),
(44, 'shield', 'You create a shimmering arcane barrier between yourself and an oncoming attack. Until the spell ends, you gain a +5 bonus to your AC (including against the triggering attack) and any magic missile targeting you is harmlessly deflected.', 1, 'Abjuration', '', 'creature', 'Self', 0, 0, 'reaction', 0, 0, '0', 1, 0, '1 round', 0, 'a5e-ag_shield'),
(45, 'alter self', 'You use magic to mold yourself into a new form. Choose one of the options below. Until the spell ends, you can use an action to choose a different option.\r\n\r\n* **Amphibian:** Your body takes on aquatic adaptations. You can breathe underwater normally and gain a swimming speed equal to your base Speed.\r\n* **Altered State:** You decide what you look like.  \r\n    \r\nNone of your gameplay statistics change but you can alter anything about your body\'s appearance, including but not limited to: your heritage, 1 foot of height, weight, clothing, tattoos, piercings, facial features, sound of your voice, hair style and length, skin and eye coloration, sex, and any other distinguishing features. You cannot become a creature of a different size category, and your limb structure remains the same; for example if you\'re bipedal, you can\'t use this spell to become a quadruped. Until the spell ends, you can use an action to change your appearance.\r\n* **Red in Tooth and Claw:** You grow magical natural weapons of your choice with a +1 bonus to attack and damage. Your unarmed strikes deal 1d6 bludgeoning, piercing, or slashing damage of a type determined by the natural weapon you chose; for example a tentacle deals bludgeoning, a horn deals piercing, and claws deal slashing.', 2, 'Transmutation', 'When using a spell slot of 5th-level, add the following to the list of forms you can adopt.\r\n\r\n* **Greater Natural Weapons:** The damage dealt by your natural weapon increases to 2d6, and you gain a +2 bonus to attack and damage rolls with your natural weapons.\r\n* **Mask of the Grave:** You adopt the appearance of a skeleton or zombie (your choice). Your type changes to undead, and mindless undead creatures ignore your presence, treating you as one of their own. You don\'t need to breathe and you become immune to poison.\r\n* **Wings:** A pair of wings sprouts from your back. The wings can appear bird-like, leathery like a bat or dragon\'s wings, or like the wings of an insect. You gain a fly speed equal to your base Speed.', 'creature', 'Self', 0, 0, 'action', 0, 0, '0', 1, 0, '1 hour', 0, 'a5e-ag_alter-self'),
(46, 'foresight', 'You impart the ability to see flashes of the immediate future. The target can\'t be surprised and has advantage on ability checks, attack rolls, and saving throws. Other creatures have disadvantage on attack rolls against the target.', 9, 'Divination', '', 'creature', 'Touch', 0, 0, '1minute', 0, 0, '0', 1, 0, '8 hours', 0, 'a5e-ag_foresight'),
(47, 'Spirit Guardians', 'You call down spirits of divine fury, filling the area with flitting spectral forms. You choose the form taken by the spirits.\r\n\r\nCreatures of your choice halve their Speed while in the area. When a creature enters the area for the first time on a turn or starts its turn there, it takes 3d6 radiant or necrotic damage (your choice).', 3, 'Conjuration', 'The damage increases by 1d6 for each slot level above 3rd.', 'area', 'Self', 0, 0, 'action', 0, 0, '0', 1, 0, '10 minutes', 0, 'a5e-ag_spirit-guardians'),
(48, 'Thaumaturgy', 'You draw upon divine power and create a minor divine effect. When you cast the spell, choose one of the following:\r\n\r\n* Your voice booms up to three times louder than normal\r\n* You cause flames to flicker, brighten, dim, or change color\r\n* You send harmless tremors throughout the ground.\r\n* You create an instantaneous sound, like ethereal chimes, sinister laughter, or a dragon\'s roar at a point of your choosing within range.\r\n* You instantaneously cause an unlocked door or window to fly open or slam shut.\r\n* You alter the appearance of your eyes.\r\n\r\nLingering effects last until the spell ends. If you cast this spell multiple times, you can have up to 3 of the lingering effects active at a time, and can dismiss an effect at any time on your turn.', 0, 'Transmutation', '', 'point', '30 feet', 30, 0, 'action', 0, 0, '0', 1, 0, '1 minute', 0, 'a5e-ag_thaumaturgy'),
(49, 'heal', 'A torrent of healing energy suffuses the target and it regains 70 hit points. The spell also ends blindness, deafness, and any diseases afflicting the target.', 6, 'Evocation', 'The hit points regained increase by 10 for each slot level above 6th.', 'point', '60 feet', 60, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_heal'),
(50, 'greater invisibility', 'The target is invisible. Anything the target is carrying or wearing is also invisible as long as it remains in the target\'s possession.', 4, 'Illusion', '', 'creature', 'Touch', 0, 0, 'action', 0, 0, '0', 1, 0, '1 minute', 0, 'a5e-ag_greater-invisibility'),
(51, 'suggestion', 'Creatures that cannot be charmed are immune to this spell. Suggest an activity phrased in a sentence or two. The target is magically influenced to follow that course of activity. The suggestion must be worded to sound reasonable. Asking the target to perform an action that is obviously harmful to it ends the spell.\r\n\r\nThe target carries out the activity suggested by you as well as it can. The activity can last for the duration of the spell, and if it requires less time the spell ends after the target has carried out the activity.\r\n\r\nYou may specify trigger conditions that cause the target to perform a specific activity while the spell lasts. For example, you may suggest that the target takes off its clothes and dives the next time it sees a body of water. If the target does not see a body of water before the spell ends, the specific activity isn\'t performed.\r\n\r\nAny damage done to the target by you or an ally ends the spell for that creature.', 2, 'Enchantment', 'When using a 4th-level spell slot, the duration is concentration, up to 24 hours. When using a 5th-level spell slot, the duration is 7 days. When using a 7th-level spell slot, the duration is 1 year. When using a 9th-level spell slot, the suggestion lasts until it is dispelled.\r\n\r\nAny use of a 5th-level or higher spell slot grants a duration that doesn\'t require concentration.', 'creature', '30 feet', 30, 0, 'action', 0, 0, '0', 1, 0, '8 hours', 0, 'a5e-ag_suggestion'),
(52, 'fireball', 'A fiery mote streaks to a point within range and explodes in a burst of flame. The fire spreads around corners and ignites unattended flammable objects. Each creature in the area takes 6d6 fire damage.', 3, 'Evocation', 'The damage increases by 1d6 for each slot level above 3rd.', 'point', '120 feet', 120, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_fireball'),
(53, 'ice storm', 'A bombardment of jagged ice erupts throughout the target area. All creatures in the area take 2d8 bludgeoning damage and 4d6 cold damage. Large chunks of ice turn the area into difficult terrain until the end of your next turn.', 4, 'Evocation', 'The bludgeoning damage increases by 1d8 for each slot level above 4th.', 'area', '300 feet', 300, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_ice-storm'),
(54, 'blight', 'Necrotic energies drain moisture and vitality from the target, dealing 8d8 necrotic damage. Undead and constructs are immune to this spell.\r\n\r\nA plant creature or magical plant has disadvantage on its saving throw and takes the maximum damage possible from this spell. A nonmagical plant that isn\'t a creature receives no saving throw and instead withers until dead.', 4, 'Necromancy', 'The damage increases by 1d8 for each slot level above 4th.', 'creature', '30 feet', 30, 0, 'action', 0, 0, '0', 1, 0, 'instantaneous', 0, 'a5e-ag_blight');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `time`
--

CREATE TABLE `time` (
  `time_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `hour` int(11) NOT NULL,
  `minute` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time`
--

INSERT INTO `time` (`time_id`, `date`, `hour`, `minute`) VALUES
(1, '1571-08-14', 23, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `turn_counter`
--

CREATE TABLE `turn_counter` (
  `round_count` int(10) UNSIGNED NOT NULL,
  `turn_count` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `turn_counter`
--

INSERT INTO `turn_counter` (`round_count`, `turn_count`) VALUES
(1, 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `character_conditions`
--
ALTER TABLE `character_conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `current_fight`
--
ALTER TABLE `current_fight`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `enemies`
--
ALTER TABLE `enemies`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `spells`
--
ALTER TABLE `spells`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `document_key` (`document_key`) USING HASH;

--
-- Indeksy dla tabeli `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`time_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `character_conditions`
--
ALTER TABLE `character_conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `conditions`
--
ALTER TABLE `conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `current_fight`
--
ALTER TABLE `current_fight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1019;

--
-- AUTO_INCREMENT for table `enemies`
--
ALTER TABLE `enemies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `spells`
--
ALTER TABLE `spells`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `time`
--
ALTER TABLE `time`
  MODIFY `time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
