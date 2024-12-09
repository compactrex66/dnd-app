-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2024 at 02:51 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

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
-- Struktura tabeli dla tabeli `current_fight`
--

CREATE TABLE `current_fight` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `health` int(11) NOT NULL,
  `AC` int(11) NOT NULL,
  `initiative` int(11) NOT NULL,
  `is_player` tinyint(1) NOT NULL,
  `enemy_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `current_fight`
--

INSERT INTO `current_fight` (`id`, `name`, `health`, `AC`, `initiative`, `is_player`, `enemy_id`) VALUES
(1, 'Voxel Pixel', 0, 17, 6, 1, NULL),
(2, 'Krasnalio', 31, 21, 7, 1, NULL),
(3, 'Dwarlock', 1, 14, 10, 1, NULL),
(600, 'Trelan Mongbery1', 24, 15, 10, 0, 36);

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
  `more_info` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enemies`
--

INSERT INTO `enemies` (`id`, `name`, `min_health`, `max_health`, `AC`, `initiative_bonus`, `more_info`) VALUES
(36, 'Trelan Mongbery', 16, 72, 15, 2, 'Medium Humanoid, Any Alignment\r\nAC 15 (chain shirt)\r\nInitiative +2 (12)\r\nHP 44 (8d8 + 8)\r\nSpeed 30 ft.\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\nStr\r\n	\r\n11\r\n	\r\n+0\r\n	\r\n+0\r\n	\r\nDex\r\n	\r\n14\r\n	\r\n+2\r\n	\r\n+4\r\n	\r\nCon\r\n	\r\n12\r\n	\r\n+1\r\n	\r\n+1\r\nInt\r\n	\r\n10\r\n	\r\n+0\r\n	\r\n+0\r\n	\r\nWis\r\n	\r\n13\r\n	\r\n+1\r\n	\r\n+3\r\n	\r\nCha\r\n	\r\n14\r\n	\r\n+2\r\n	\r\n+2\r\nSkills Acrobatics +4, Perception +5, Performance +6\r\nGear Shortbow, Shortsword\r\nSenses Passive Perception 15\r\nLanguages Any two languages\r\nCR 2 (XP 450; PB +2\r\n\r\nTraits\r\n\r\nSong of Rest. The bard can perform a song while taking a short rest. Any ally who hears the song regains an extra 1d6 hit points if it spends any Hit Dice to regain hit points at the end of that rest. The bard can confer this benefit on itself as well.\r\nSpellcasting. The bard is a 4th-level spellcaster. Its spellcasting ability is Charisma (spell save DC 12, +5 to hit with spell attacks). It has the following bard spells prepared:\r\n\r\n    Cantrips (at will): friends, mage hand, vicious mockery\r\n\r\n\r\n    1st level (4 slots): charm person, healing word, heroism, sleep, thunderwave\r\n\r\n\r\n    2nd level (3 slots): invisibility, shatter\r\n\r\nTaunt (2/Day). The bard can use a bonus action on its turn to target one creature within 30 feet of it. If the target can hear the bard, the target must succeed on a DC 12 Charisma saving throw or have disadvantage on ability checks, attack rolls, and saving throws until the start of the bard&#039;s next turn.\r\n\r\nActions\r\n\r\nShortsword. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 11 (3d6+2) piercing damage.\r\n\r\nShortbow. Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 11 (3d6+2) piercing damage.'),
(37, 'Sahuagin Warrior', 8, 36, 12, 0, 'Medium Humanoid (Sahuagin), Lawful Evil\r\nAC 12 (natural armor)\r\nInitiative +0 (10)\r\nHP 22 (4d8 + 4)\r\nSpeed 30 ft., Swim 40 ft.\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\nStr\r\n	\r\n13\r\n	\r\n+1\r\n	\r\n+1\r\n	\r\nDex\r\n	\r\n11\r\n	\r\n+0\r\n	\r\n+0\r\n	\r\nCon\r\n	\r\n12\r\n	\r\n+1\r\n	\r\n+1\r\nInt\r\n	\r\n12\r\n	\r\n+1\r\n	\r\n+1\r\n	\r\nWis\r\n	\r\n13\r\n	\r\n+1\r\n	\r\n+1\r\n	\r\nCha\r\n	\r\n9\r\n	\r\n-1\r\n	\r\n-1\r\nSkills Perception +5\r\nGear Spear\r\nSenses Darkvision 120 ft., Passive Perception 15\r\nLanguages Sahuagin\r\nCR 1/2 (XP 100; PB +2)\r\nTraits\r\n\r\nTemporary Statblock. This statblock is a placeholder.\r\n\r\nBlood Frenzy. The sahuagin has advantage on melee attack rolls against any creature that doesn\'t have all its hit points.\r\n\r\nLimited Amphibiousness. The sahuagin can breathe air and water, but it needs to be submerged at least once every 4 hours to avoid suffocating.\r\n\r\nShark Telepathy. The sahuagin can magically command any shark within 120 feet of it, using a limited telepathy.\r\nActions\r\n\r\nMultiattack. The sahuagin makes two melee attacks: one with its bite and one with its claws or spear.\r\n\r\nBite. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) piercing damage.\r\n\r\nClaws. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) slashing damage.\r\n\r\nSpear. Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack.'),
(38, 'Sahuagin Priest', 12, 54, 12, 0, 'Medium Humanoid (Sahuagin), Lawful Evil\r\nAC 12 (natural armor)\r\nInitiative +0 (10)\r\nHP 33 (6d8 + 6)\r\nSpeed 30 ft., Swim 40 ft.\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\nStr\r\n	\r\n13\r\n	\r\n+1\r\n	\r\n+1\r\n	\r\nDex\r\n	\r\n11\r\n	\r\n+0\r\n	\r\n+0\r\n	\r\nCon\r\n	\r\n12\r\n	\r\n+1\r\n	\r\n+1\r\nInt\r\n	\r\n12\r\n	\r\n+1\r\n	\r\n+1\r\n	\r\nWis\r\n	\r\n14\r\n	\r\n+2\r\n	\r\n+2\r\n	\r\nCha\r\n	\r\n13\r\n	\r\n+1\r\n	\r\n+1\r\nSkills Perception +6, Religion +3\r\nSenses Darkvision 120 ft., Passive Perception 16\r\nLanguages Sahuagin\r\nCR 2 (XP 450; PB +2)\r\nTraits\r\n\r\nTemporary Statblock. This statblock is a placeholder.\r\n\r\nBlood Frenzy. The sahuagin has advantage on melee attack rolls against any creature that doesn\'t have all its hit points.\r\n\r\nLimited Amphibiousness. The sahuagin can breathe air and water, but it needs to be submerged at least once every 4 hours to avoid suffocating.\r\n\r\nShark Telepathy. The sahuagin can magically command any shark within 120 feet of it, using a limited telepathy.\r\n\r\nSpellcasting. The sahuagin is a 6th-level spellcaster. Her spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). She has the following cleric spells prepared:\r\n\r\n    Cantrips (at will): guidance, thaumaturgy\r\n\r\n    1st level (4 slots): bless, detect magic, guiding bolt\r\n\r\n    2nd level (3 slots): hold person, spiritual weapon (trident)\r\n\r\n    3rd level (3 slots): mass healing word, tongues\r\n\r\nActions\r\n\r\nMultiattack. The sahuagin makes two melee attacks: one with her bite and one with her claws.\r\n\r\nBite. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) piercing damage.\r\n\r\nClaws. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) slashing damage.'),
(39, 'Sahuagin Baron', 36, 117, 16, 2, 'Large Humanoid (Sahuagin), Lawful Evil\r\nAC 16 (breastplate)\r\nInitiative +2 (12)\r\nHP 76 (9d10 + 27)\r\nSpeed 30 ft., Swim 50 ft.\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\nStr\r\n	\r\n19\r\n	\r\n+4\r\n	\r\n+4\r\n	\r\nDex\r\n	\r\n15\r\n	\r\n+2\r\n	\r\n+5\r\n	\r\nCon\r\n	\r\n16\r\n	\r\n+3\r\n	\r\n+6\r\nInt\r\n	\r\n14\r\n	\r\n+2\r\n	\r\n+5\r\n	\r\nWis\r\n	\r\n13\r\n	\r\n+1\r\n	\r\n+4\r\n	\r\nCha\r\n	\r\n17\r\n	\r\n+3\r\n	\r\n+3\r\nSkills Perception +7\r\nGear Trident\r\nSenses Darkvision 120 ft., Passive Perception 17\r\nLanguages Sahuagin\r\nCR 5 (XP 1,800; PB +3)\r\nTraits\r\n\r\nBlood Frenzy. The sahuagin has advantage on melee attack rolls against any creature that doesn\'t have all its hit points.\r\n\r\nLimited Amphibiousness. The sahuagin can breathe air and water, but it needs to be submerged at least once every 4 hours to avoid suffocating.\r\n\r\nShark Telepathy. The sahuagin can magically command any shark within 120 feet of it, using a limited telepathy.\r\nActions\r\n\r\nMultiattack. The sahuagin makes three attacks: one with his bite and two with his claws or trident.\r\n\r\nBite. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) piercing damage.\r\n\r\nClaws. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.\r\n\r\nTrident. Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack.\r\nEnvironment: Coastal, Underwater'),
(40, 'Basilisk', 24, 80, 15, -1, 'Medium Monstrosity, Unaligned\r\nAC 15 (natural armor)\r\nInitiative -1 (9)\r\nHP 52 (8d8 + 16)\r\nSpeed 20 ft.\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\nStr\r\n	\r\n16\r\n	\r\n+3\r\n	\r\n+3\r\n	\r\nDex\r\n	\r\n8\r\n	\r\n-1\r\n	\r\n-1\r\n	\r\nCon\r\n	\r\n15\r\n	\r\n+2\r\n	\r\n+2\r\nInt\r\n	\r\n2\r\n	\r\n-4\r\n	\r\n-4\r\n	\r\nWis\r\n	\r\n8\r\n	\r\n-1\r\n	\r\n-1\r\n	\r\nCha\r\n	\r\n7\r\n	\r\n-2\r\n	\r\n-2\r\nSenses Darkvision 60 ft., Passive Perception 9\r\nLanguages —\r\nCR 3 (XP 700; PB +2)\r\nTraits\r\n\r\nPetrifying Gaze. If a creature starts its turn within 30 feet of the basilisk and the two of them can see each other, the basilisk can force the creature to make a DC 12 Constitution saving throw if the basilisk isn\'t incapacitated. On a failed save, the creature magically begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified until freed by the greater restoration spell or other magic.\r\n\r\nA creature that isn\'t surprised can avert its eyes to avoid the saving throw at the start of its turn. If it does so, it can\'t see the basilisk until the start of its next turn, when it can avert its eyes again. If it looks at the basilisk in the meantime, it must immediately make the save.\r\n\r\nIf the basilisk sees its reflection within 30 feet of it in bright light, it mistakes itself for a rival and targets itself with its gaze.\r\nActions\r\n\r\nBite. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage.\r\nEnvironment: Mountain'),
(41, 'Knight', 24, 80, 18, 0, 'Small or Medium Humanoid, Any Alignment\r\nAC 18\r\nInitiative +0 (10)\r\nHP 52 (8d8 + 16)\r\nSpeed 30 ft.\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\nStr\r\n	\r\n16\r\n	\r\n+3\r\n	\r\n+3\r\n	\r\nDex\r\n	\r\n11\r\n	\r\n+0\r\n	\r\n+0\r\n	\r\nCon\r\n	\r\n14\r\n	\r\n+2\r\n	\r\n+2\r\nInt\r\n	\r\n11\r\n	\r\n+0\r\n	\r\n+0\r\n	\r\nWis\r\n	\r\n11\r\n	\r\n+0\r\n	\r\n+2\r\n	\r\nCha\r\n	\r\n15\r\n	\r\n+2\r\n	\r\n+2\r\nGear Greatsword, Heavy Crossbow, Plate Armor\r\nSenses Passive Perception 10\r\nLanguages Common plus one other language\r\nCR 3 (XP 700; PB +2)\r\nActions\r\n\r\nMultiattack. The knight makes two attacks, using Greatsword or Heavy Crossbow in any combination.\r\n\r\nGreatsword. Melee Attack Roll: +5, reach 5 ft. Hit: 10 (2d6 + 3) Slashing damage plus 4 (1d8) Radiant damage.\r\n\r\nHeavy Crossbow. Ranged Attack Roll: +2, range 100/400 ft. Hit: 11 (2d10) Piercing damage plus 4 (1d8) Radiant damage.\r\nReactions\r\n\r\nParry. Trigger: The knight is hit by a melee attack roll while holding a weapon. Response: The knight adds 2 to its AC against that attack, possibly causing it to miss.'),
(43, 'Mage', 18, 144, 15, 2, 'Small or Medium Humanoid, Any Alignment\r\nAC 15\r\nInitiative +2 (12)\r\nHP 81 (18d8)\r\nSpeed 30 ft.\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\n	\r\n	\r\n	\r\nmod\r\n	\r\nsave\r\nStr\r\n	\r\n9\r\n	\r\n-1\r\n	\r\n-1\r\n	\r\nDex\r\n	\r\n14\r\n	\r\n+2\r\n	\r\n+2\r\n	\r\nCon\r\n	\r\n11\r\n	\r\n+0\r\n	\r\n+0\r\nInt\r\n	\r\n17\r\n	\r\n+3\r\n	\r\n+6\r\n	\r\nWis\r\n	\r\n12\r\n	\r\n+1\r\n	\r\n+4\r\n	\r\nCha\r\n	\r\n11\r\n	\r\n+0\r\n	\r\n+0\r\nSkills Arcana +6, History +6\r\nSenses Passive Perception 11\r\nLanguages Common and any three languages\r\nCR 6 (XP 2,300; PB +3)\r\nActions\r\n\r\nMultiattack. The mage makes three Arcane Burst attacks.\r\n\r\nArcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. Hit: 16 (3d10) Force damage.\r\n\r\nSpellcasting. The mage casts one of the following spells using Intelligence as the spellcasting ability (spell save DC 14):\r\n\r\n    At will: Detect Magic, Light, Mage Armor (included above), Mage Hand, Prestidigitation\r\n\r\n    2/day each: Fireball, Fly, Suggestion\r\n\r\n    1/day: Cone of Cold\r\n\r\nReactions\r\n\r\nCounterspell (1/Day). The mage casts Counterspell in response to that spell\'s trigger, using the same spellcasting ability in Spellcasting.\r\n\r\nShield (2/Day). The mage casts Shield in response to that spell\'s trigger, using the same spellcasting ability in Spellcasting.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `AC` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `AC`) VALUES
(1, 'Voxel Pixel', 15),
(2, 'Krasnalio', 19),
(3, 'Dwarlock', 14);

--
-- Indeksy dla zrzutów tabel
--

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
-- Indeksy dla tabeli `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `current_fight`
--
ALTER TABLE `current_fight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=611;

--
-- AUTO_INCREMENT for table `enemies`
--
ALTER TABLE `enemies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
