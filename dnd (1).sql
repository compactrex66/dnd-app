-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2025 at 07:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `current_fight`
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
(1, 'Voxel Pixel', 50, 50, 17, 20, 1, NULL, 1),
(2, 'Krasnalio', 50, 50, 21, 15, 1, NULL, 0),
(3, 'Dwarlock', 50, 50, 14, 13, 1, NULL, 0),
(945, 'Mage1', 33, 33, 12, 5, 0, 57, 0),
(946, 'Troll2', 74, 74, 15, 20, 0, 62, 0);

-- --------------------------------------------------------

--
-- Table structure for table `enemies`
--

CREATE TABLE `enemies` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `min_health` int(11) NOT NULL,
  `max_health` int(11) NOT NULL,
  `AC` int(11) NOT NULL,
  `initiative_bonus` int(11) NOT NULL,
  `more_info` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enemies`
--

INSERT INTO `enemies` (`id`, `name`, `min_health`, `max_health`, `AC`, `initiative_bonus`, `more_info`) VALUES
(44, 'Gnoll Demoniac', 72, 198, 16, 1, '___\r\n>## Gnoll Demoniac\r\n>*Medium Fiend, chaotic evil*\r\n>___\r\n>- **Armor Class** 16\r\n>- **Hit Points** 135 (18d8 + 54)\r\n>- **Speed** 30 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|16 (+3)|12 (+1)|17 (+3)|14 (+2)|15 (+2)|17 (+3)|\r\n>___\r\n>- **Saving Throws** Str +6, Con +6, Wis +5, Cha +6\r\n>- **Skills** Perception +5\r\n>- **Senses** Darkvision 60 ft., passive Perception 15\r\n>- **Languages** Abyssal, Common, Gnoll\r\n>- **Challenge** 8 (XP 3,900; PB +3)\r\n>- **Proficiency Bonus** +3\r\n>___\r\n>### Actions\r\n>***Multiattack.*** The gnoll makes two Abyssal Strike attacks.  \r\n>\r\n>***Abyssal Strike.*** *Melee  or Ranged Attack Roll:*  +6, reach 5 ft. or range 60 ft. *Hit:* 20 (5d6 + 3) Poison damage.  \r\n>\r\n>***Hunger of Yeenoghu (Recharge 5–6).*** The gnoll conjures a 30-foot Cube of magical Darkness originating from a point it can see within 60 feet, which lasts for 1 minute or until the gnoll\'s Concentration ends on it. This area is Difficult Terrain. *Dexterity Saving Throw:* DC 14, any creature that starts its turn in this area or enters it for the first time on a turn. *Failure:* 28 (8d6) Necrotic damage, and the gnoll or a creature of its choice it can see gains 10 Temporary Hit Points. *Success:* Half damage only.  \r\n>\r\n>### Bonus Actions\r\n>***Rampage (2/Day).*** Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Abyssal Strike attack.'),
(45, 'Gnoll Fang of Yeenoghu', 33, 110, 14, 2, '___\r\n>## Gnoll Fang of Yeenoghu\r\n>*Medium Fiend, chaotic evil*\r\n>___\r\n>- **Armor Class** 14\r\n>- **Hit Points** 71 (11d8 + 22)\r\n>- **Speed** 30 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|17 (+3)|15 (+2)|15 (+2)|10 (+0)|11 (+0)|13 (+1)|\r\n>___\r\n>- **Saving Throws** Con +4, Wis +2, Cha +3\r\n>- **Senses** Darkvision 60 ft., passive Perception 10\r\n>- **Languages** Abyssal, Gnoll\r\n>- **Challenge** 4 (XP 1,100; PB +2)\r\n>- **Proficiency Bonus** +2\r\n>___\r\n>### Actions\r\n>***Multiattack.*** The gnoll makes one Bite attack and two Bone Flail attacks.  \r\n>\r\n>***Bite.*** *Melee Attack Roll:*  +5, reach 5 ft. *Hit:* 6 (1d6 + 3) Piercing damage plus 7 (2d6) Poison damage, and the target has the Poisoned condition until the start of the gnoll\'s next turn.  \r\n>\r\n>***Bone Flail.*** *Melee Attack Roll:*  +5, reach 10 ft. *Hit:* 7 (1d8 + 3) Piercing damage.  \r\n>\r\n>### Bonus Actions\r\n>***Rampage (2/Day).*** Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Bite attack.'),
(46, 'Gnoll Pack Lord', 18, 81, 15, 2, '___\r\n>## Gnoll Pack Lord\r\n>*Medium Fiend, chaotic evil*\r\n>___\r\n>- **Armor Class** 15\r\n>- **Hit Points** 49 (9d8 + 9)\r\n>- **Speed** 30 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|16 (+3)|14 (+2)|13 (+1)|8 (-1)|11 (+0)|9 (-1)|\r\n>___\r\n>- **Senses** Darkvision 60 ft., passive Perception 10\r\n>- **Languages** Gnoll\r\n>- **Challenge** 2 (XP 450; PB +2)\r\n>- **Proficiency Bonus** +2\r\n>___\r\n>### Actions\r\n>***Multiattack.*** The gnoll makes two attacks, using Bone Whip or Bone Javelin in any combination, and it uses Incite Rampage if available.  \r\n>\r\n>***Bone Whip.*** *Melee Attack Roll:*  +5, reach 10 ft. *Hit:* 8 (2d4 + 3) Slashing damage.  \r\n>\r\n>***Bone Javelin.*** *Ranged Attack Roll:*  +5, range 30/120 ft. *Hit:* 7 (1d8 + 3) Piercing damage.  \r\n>\r\n>***Incite Rampage (Recharge 5–6).*** The gnoll targets another creature it can see within 60 feet of itself that has the Rampage Bonus Action. The target can take a Reaction to make one melee attack.  \r\n>\r\n>### Bonus Actions\r\n>***Rampage (2/Day).*** Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Bone Whip attack.'),
(51, 'Skeleton', 6, 20, 13, 2, '___\r\n>## Skeleton\r\n>*Medium undead, lawful evil*\r\n>___\r\n>- **Armor Class** 13 (armor scraps)\r\n>- **Hit Points** 13 (2d8 + 4)\r\n>- **Speed**  30 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|10 (+0)|14 (+2)|15 (+2)|6 (--2)|8 (--1)|5 (--3)|\r\n>___\r\n>- **Damage Vulnerabilities** bludgeoning, \r\n>- **Damage Immunities** poison, \r\n>- **Condition Immunities** Poisoned, Exhaustion, \r\n>- **Senses** darkvision 60 ft, passive perception 9, \r\n>- **Langauges** understands all languages it spoke in life but can\'t speak\r\n>- **Challenge** 0.25 (XP 50; PB 2)\r\n>- **Proficiency Bonus** +2\r\n>___\r\n>###Actions\r\n>***Shortsword.*** Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.\r\n>\r\n>***Shortbow.*** Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.\r\n>'),
(55, 'Knight', 24, 80, 18, 0, '___\r\n>## Knight\r\n>*Medium humanoid (any race), any alignment*\r\n>___\r\n>- **Armor Class** 18 (armor armor)\r\n>- **Hit Points** 52 (8d8 + 16)\r\n>- **Speed**  30 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|16 (+3)|11 (+0)|14 (+2)|11 (+0)|11 (+0)|15 (+2)|\r\n>___\r\n>- **Saving Throws** Con +4, Wis +2, \r\n>- **Senses** passive perception 10, \r\n>- **Langauges** any one language (usually Common)\r\n>- **Challenge** 3 (XP 700; PB 2)\r\n>- **Proficiency Bonus** +2\r\n>___\r\n>***Brave.*** The knight has advantage on saving throws against being frightened.\r\n>\r\n>###Actions\r\n>***Multiattack.*** The knight makes two melee attacks.\r\n>\r\n>***Greatsword.*** Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.\r\n>\r\n>***Heavy Crossbow.*** Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage.\r\n>\r\n>***Leadership.*** For 1 minute, the knight can utter a special command or warning whenever a nonhostile creature that it can see within 30 ft. of it makes an attack roll or a saving throw. The creature can add a d4 to its roll provided it can hear and understand the knight. A creature can benefit from only one Leadership die at a time. This effect ends if the knight is incapacitated.\r\n>>### Reactions\r\n>**Parry.** The knight adds 2 to its AC against one melee attack that would hit it. To do so, the knight must see the attacker and be wielding a melee weapon.'),
(57, 'Mage', 9, 72, 12, 2, '___\r\n>## Mage\r\n>*Medium humanoid (any race), any alignment*\r\n>___\r\n>- **Armor Class** 12 (dex armor)\r\n>- **Hit Points** 40 (9d8)\r\n>- **Speed**  30 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|9 (--1)|14 (+2)|11 (+0)|17 (+3)|12 (+1)|11 (+0)|\r\n>___\r\n>- **Saving Throws** Int +6, Wis +4, \r\n>- **Skills** Arcana +6, History +6, \r\n>- **Senses** passive perception 11, \r\n>- **Langauges** any four languages\r\n>- **Challenge** 6 (XP 2300; PB 3)\r\n>- **Proficiency Bonus** +3\r\n>___\r\n>***Spellcasting.*** The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:\r\n>\r\n>- Cantrips (at will): fire bolt, light, mage hand, prestidigitation\r\n>- 1st level (4 slots): detect magic, mage armor, magic missile, shield\r\n>- 2nd level (3 slots): misty step, suggestion\r\n>- 3rd level (3 slots): counterspell, fireball, fly\r\n>- 4th level (3 slots): greater invisibility, ice storm\r\n>- 5th level (1 slot): cone of cold\r\n>\r\n>###Actions\r\n>***Dagger.*** Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage.\r\n>'),
(58, 'Priest', 10, 45, 13, 0, '___\r\n>## Priest\r\n>*Medium humanoid (any race), any alignment*\r\n>___\r\n>- **Armor Class** 13 (armor armor)\r\n>- **Hit Points** 27 (5d8 + 5)\r\n>- **Speed**  25 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|10 (+0)|10 (+0)|12 (+1)|13 (+1)|16 (+3)|13 (+1)|\r\n>___\r\n>- **Saving Throws** \r\n>- **Skills** Medicine +7, Persuasion +3, Religion +4, \r\n>- **Senses** passive perception 13, \r\n>- **Langauges** any two languages\r\n>- **Challenge** 2 (XP 450; PB 2)\r\n>- **Proficiency Bonus** +2\r\n>___\r\n>***Divine Eminence.*** As a bonus action, the priest can expend a spell slot to cause its melee weapon attacks to magically deal an extra 10 (3d6) radiant damage to a target on a hit. This benefit lasts until the end of the turn. If the priest expends a spell slot of 2nd level or higher, the extra damage increases by 1d6 for each level above 1st.\r\n>\r\n>***Spellcasting.*** The priest is a 5th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 13, +5 to hit with spell attacks). The priest has the following cleric spells prepared:\r\n>\r\n>- Cantrips (at will): light, sacred flame, thaumaturgy\r\n>- 1st level (4 slots): cure wounds, guiding bolt, sanctuary\r\n>- 2nd level (3 slots): lesser restoration, spiritual weapon\r\n>- 3rd level (2 slots): dispel magic, spirit guardians\r\n>\r\n>###Actions\r\n>***Mace.*** Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage.\r\n>'),
(59, 'Flesh Golem', 55, 132, 9, 1, '___\r\n>## Flesh Golem\r\n>*Medium construct, neutral*\r\n>___\r\n>- **Armor Class** 9 (dex armor)\r\n>- **Hit Points** 93 (11d8 + 44)\r\n>- **Speed**  30 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|19 (+4)|9 (--1)|18 (+4)|6 (--2)|10 (+0)|5 (--3)|\r\n>___\r\n>- **Damage Immunities** lightning, poison, bludgeoning, piercing, and slashing from nonmagical weapons that aren\'t adamantine, \r\n>- **Condition Immunities** Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned, \r\n>- **Senses** darkvision 60 ft, passive perception 10, \r\n>- **Langauges** understands the languages of its creator but can\'t speak\r\n>- **Challenge** 5 (XP 1800; PB 3)\r\n>- **Proficiency Bonus** +3\r\n>___\r\n>***Berserk.*** Whenever the golem starts its turn with 40 hit points or fewer, roll a d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the golem goes berserk, it continues to do so until it is destroyed or regains all its hit points.\r\n>The golem\'s creator, if within 60 feet of the berserk golem, can try to calm it by speaking firmly and persuasively. The golem must be able to hear its creator, who must take an action to make a DC 15 Charisma (Persuasion) check. If the check succeeds, the golem ceases being berserk. If it takes damage while still at 40 hit points or fewer, the golem might go berserk again.\r\n>\r\n>***Aversion of Fire.*** If the golem takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn.\r\n>\r\n>***Immutable Form.*** The golem is immune to any spell or effect that would alter its form.\r\n>\r\n>***Lightning Absorption.*** Whenever the golem is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt.\r\n>\r\n>***Magic Resistance.*** The golem has advantage on saving throws against spells and other magical effects.\r\n>\r\n>***Magic Weapons.*** The golem\'s weapon attacks are magical.\r\n>\r\n>###Actions\r\n>***Multiattack.*** The golem makes two slam attacks.\r\n>\r\n>***Slam.*** Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.\r\n>'),
(60, 'Ogre Zombie', 45, 126, 8, 2, '___\r\n>## Ogre Zombie\r\n>*Large undead, neutral evil*\r\n>___\r\n>- **Armor Class** 8 (dex armor)\r\n>- **Hit Points** 85 (9d10 + 36)\r\n>- **Speed**  30 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|19 (+4)|6 (--2)|18 (+4)|3 (--4)|6 (--2)|5 (--3)|\r\n>___\r\n>- **Saving Throws** Wis +0, \r\n>- **Damage Immunities** poison, \r\n>- **Condition Immunities** Poisoned, \r\n>- **Senses** darkvision 60 ft, passive perception 8, \r\n>- **Langauges** understands Common and Giant but can\'t speak\r\n>- **Challenge** 2 (XP 450; PB 2)\r\n>- **Proficiency Bonus** +2\r\n>___\r\n>***Undead Fortitude.*** If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5+the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.\r\n>\r\n>###Actions\r\n>***Morningstar.*** Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.\r\n>'),
(61, 'Minotaur Skeleton', 27, 108, 12, 0, '___\r\n>## Minotaur Skeleton\r\n>*Large undead, lawful evil*\r\n>___\r\n>- **Armor Class** 12 (natural armor)\r\n>- **Hit Points** 67 (9d10 + 18)\r\n>- **Speed**  40 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|18 (+4)|11 (+0)|15 (+2)|6 (--2)|8 (--1)|5 (--3)|\r\n>___\r\n>- **Damage Vulnerabilities** bludgeoning, \r\n>- **Damage Immunities** poison, \r\n>- **Condition Immunities** Exhaustion, Poisoned, \r\n>- **Senses** darkvision 60 ft, passive perception 9, \r\n>- **Langauges** understands Abyssal but can\'t speak\r\n>- **Challenge** 2 (XP 450; PB 2)\r\n>- **Proficiency Bonus** +2\r\n>___\r\n>***Charge.*** If the skeleton moves at least 10 feet straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be pushed up to 10 feet away and knocked prone.\r\n>\r\n>###Actions\r\n>***Greataxe.*** Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.\r\n>\r\n>***Gore.*** Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.\r\n>'),
(62, 'Troll', 54, 135, 15, 4, '___\r\n>## Troll\r\n>*Large Giant, chaotic evil*\r\n>___\r\n>- **Armor Class** 15\r\n>- **Hit Points** 94 (9d10 + 45)\r\n>- **Speed** 30 ft.\r\n>- **Initiative** +1 (11)\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|18 (+4)|13 (+1)|20 (+5)|7 (-2)|9 (-1)|7 (-2)|\r\n>___\r\n>- **Skills** Perception +5\r\n>- **Senses** Darkvision 60 ft., passive Perception 15\r\n>- **Languages** Giant\r\n>- **Challenge** 5 (XP 1,800; PB +3)\r\n>- **Proficiency Bonus** +3\r\n>___\r\n>***Loathsome Limbs (4/Day).*** If the troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the troll\'s limbs is severed, falls into the troll\'s space, and becomes a **Troll Limb**. The limb acts immediately after the troll\'s turn. The troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.  \r\n>\r\n>***Regeneration.*** The troll regains 15 Hit Points at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn\'t function on the troll\'s next turn. The troll dies only if it starts its turn with 0 Hit Points and doesn\'t regenerate.  \r\n>\r\n>### Actions\r\n>***Multiattack.*** The troll makes three Rend attacks.  \r\n>\r\n>***Rend.*** *Melee Attack Roll:*  +7, reach 10 ft. *Hit:* 11 (2d6 + 4) Slashing damage.  \r\n>\r\n>### Bonus Actions\r\n>***Charge.*** The troll moves up to half its Speed straight toward an enemy it can see.  \r\n>');

-- --------------------------------------------------------

--
-- Table structure for table `spells`
--

CREATE TABLE `spells` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `description` text NOT NULL,
  `level` tinyint(3) UNSIGNED NOT NULL,
  `higher_level` text NOT NULL,
  `target_type` tinytext NOT NULL,
  `range_text` tinytext NOT NULL,
  `range_num` int(11) NOT NULL,
  `ritual` tinyint(1) NOT NULL,
  `casting_time` tinytext NOT NULL,
  `verbal` tinyint(1) NOT NULL,
  `somatic` tinyint(1) NOT NULL,
  `target_count` tinyint(3) UNSIGNED NOT NULL,
  `attack_roll` tinyint(1) NOT NULL,
  `duration` tinytext NOT NULL,
  `concentration` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spells`
--

INSERT INTO `spells` (`id`, `name`, `description`, `level`, `higher_level`, `target_type`, `range_text`, `range_num`, `ritual`, `casting_time`, `verbal`, `somatic`, `target_count`, `attack_roll`, `duration`, `concentration`) VALUES
(1, 'Light', 'You touch one Large or smaller object that isn\'t being worn or carried by someone else. Until the spell ends, the object sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. The light can be colored as you like. Covering the object with something opaque blocks the light. The spell ends if you cast it again.', 0, '', 'creature', 'Touch', 0, 0, 'action', 1, 0, 1, 0, '1 hour', 0),
(2, 'Prestidigitation', 'You create a magical effect within range. Choose the effect from the options below. If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time. a puff of wind, faint musical notes, or an odd odor. Fire Play. You instantaneously light or snuff out a candle, a torch, or a small campfire.', 0, '', 'creature', '10 feet', 10, 0, 'action', 1, 1, 1, 0, '1 hour', 0),
(3, 'Shield', 'An imperceptible barrier of magical force protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from Magic Missile.', 1, '', 'creature', 'Self', 0, 0, 'reaction', 1, 1, 1, 0, '1 round', 0),
(4, 'Suggestion', 'You suggest a course of activity—described in no more than 25 words—to one creature you can see within range that can hear and understand you. The suggestion must sound achievable and not involve anything that would obviously deal damage to the target or its allies. For example, you could say, \"Fetch the key to the cult\'s treasure vault, and give the key to me.\" Or you could say, \"Stop fighting, leave this library peacefully, and don\'t return.\" The target must succeed on a Wisdom saving throw or have the Charmed condition for the duration or until you or your allies deal damage to the target. The Charmed target pursues the suggestion to the best of its ability. The suggested activity can continue for the entire duration, but if the suggested activity can be completed in a shorter time, the spell ends for the target upon completing it.', 2, '', 'creature', '30 feet', 30, 0, 'action', 1, 0, 1, 0, '8 hour', 1),
(5, 'Counterspell', 'You attempt to interrupt a creature in the process of casting a spell. The creature makes a Constitution saving throw. On a failed save, the spell dissipates with no effect, and the action, Bonus Action, or Reaction used to cast it is wasted. If that spell was cast with a spell slot, the slot isn\'t expended.', 3, '', 'creature', '60 feet', 60, 0, 'reaction', 0, 1, 1, 0, 'instantaneous', 0),
(6, 'Fireball', 'A bright streak flashes from you to a point you choose within range and then blossoms with a low roar into a fiery explosion. Each creature in a 20-foot-radius Sphere centered on that point makes a Dexterity saving throw, taking 8d6 Fire damage on a failed save or half as much damage on a successful one. Flammable objects in the area that aren\'t being worn or carried start burning.', 3, '', 'creature', '150 feet', 150, 0, 'action', 1, 1, 1, 0, 'instantaneous', 0),
(7, 'Fly', '', 3, 'You can target one additional creature for each spell slot level above 3.', 'creature', 'Touch', 0, 0, 'action', 1, 1, 1, 0, '10 minute', 1),
(8, 'Fire Bolt', 'You hurl a mote of fire at a creature or an object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 Fire damage. A flammable object hit by this spell starts burning if it isn\'t being worn or carried.', 0, 'The damage increases by 1d10 when you reach levels 5 (2d10), 11 (3d10), and 17 (4d10).', 'creature', '120 feet', 120, 0, 'action', 1, 1, 1, 1, 'instantaneous', 0),
(9, 'Mage Hand', 'A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again. When you cast the spell, you can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. As a Magic action on your later turns, you can control the hand thus again. As part of that action, you can move the hand up to 30 feet. The hand can\'t attack, activate magic items, or carry more than 10 pounds.', 0, '', 'creature', '30 feet', 30, 0, 'action', 1, 1, 1, 0, '1 minute', 0),
(10, 'Detect Magic', 'For the duration, you sense the presence of magical effects within 30 feet of yourself. If you sense such effects, you can take the Magic action to see a faint aura around any visible creature or object in the area that bears the magic, and if an effect was created by a spell, you learn the spell\'s school of magic. The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.', 1, '', 'creature', 'Self', 0, 1, 'action', 1, 1, 1, 0, '10 minute', 1),
(11, 'Mage Armor', 'You touch a willing creature who isn\'t wearing armor. Until the spell ends, the target\'s base AC becomes 13 plus its Dexterity modifier. The spell ends early if the target dons armor.', 1, '', 'creature', 'Touch', 0, 0, 'action', 1, 1, 1, 0, '8 hour', 0),
(12, 'Magic Missile', 'You create three glowing darts of magical force. Each dart strikes a creature of your choice that you can see within range. A dart deals 1d4 + 1 Force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.', 1, 'The spell creates one more dart for each spell slot level above 1.', 'creature', '120 feet', 120, 0, 'action', 1, 1, 1, 0, 'instantaneous', 0),
(13, 'Misty Step', 'Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space you can see.', 2, '', 'creature', 'Self', 0, 0, 'bonus_action', 1, 0, 1, 0, 'instantaneous', 0),
(14, 'Greater Invisibility', '', 4, '', 'creature', 'Touch', 0, 0, 'action', 1, 1, 1, 0, '1 minute', 1),
(15, 'Ice Storm', 'Hail falls in a 20-foot-radius, 40-foot-high Cylinder centered on a point within range. Each creature in the Cylinder makes a Dexterity saving throw. A creature takes 2d10 Bludgeoning damage and 4d6 Cold damage on a failed save or half as much damage on a successful one. Hailstones turn ground in the Cylinder into Difficult Terrain until the end of your next turn.', 4, 'The Bludgeoning damage increases by 1d10 for each spell slot level above 4.', 'creature', '300 feet', 300, 0, 'action', 1, 1, 1, 0, 'instantaneous', 0),
(16, 'Cone of Cold', 'You unleash a blast of cold air. Each creature in a 60-foot Cone originating from you makes a Constitution saving throw, taking 8d8 Cold damage on a failed save or half as much damage on a successful one. A creature killed by this spell becomes a frozen statue until it thaws.', 5, 'The damage increases by 1d8 for each spell slot level above 5.', 'creature', 'Self', 0, 0, 'action', 1, 1, 1, 0, 'instantaneous', 0);

-- --------------------------------------------------------

--
-- Table structure for table `time`
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
(1, '1571-08-13', 7, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `current_fight`
--
ALTER TABLE `current_fight`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enemies`
--
ALTER TABLE `enemies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spells`
--
ALTER TABLE `spells`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`time_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `current_fight`
--
ALTER TABLE `current_fight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=948;

--
-- AUTO_INCREMENT for table `enemies`
--
ALTER TABLE `enemies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `spells`
--
ALTER TABLE `spells`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `time`
--
ALTER TABLE `time`
  MODIFY `time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
