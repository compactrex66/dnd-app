-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 20, 2024 at 11:29 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

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
(1, 'Voxel Pixel', 37, 17, 10, 1, NULL),
(2, 'Krasnalio', 10, 19, 11, 1, NULL),
(3, 'Dwarlock', 23, 14, 10, 1, NULL);

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
(1, 'Thug', 15, 50, 11, 0, 'Speed 30 ft.\r\nSTR 	DEX 	CON 	INT 	WIS 	CHA\r\n15 (+2) 	11 (+0) 	14 (+2) 	10 (+0) 	10 (+0) 	11 (+0)\r\n\r\nSkills Intimidation +2\r\n\r\nSenses passive Perception 10\r\n\r\nLanguages any one language (usually Common)\r\n\r\nChallenge 1/2 (100 XP)\r\n\r\nPack Tactics. The thug has advantage on an attack roll against a creature if at least one of the thug’s allies is within 5 feet of the creature and the ally isn’t incapacitated.\r\n\r\nActions\r\n\r\nMultiattack. The thug makes two melee attacks.\r\n\r\nMace. Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) bludgeoning damage.\r\n\r\nHeavy Crossbow. Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage.'),
(2, 'Veteran', 27, 90, 17, 1, 'Speed 30 ft.\r\nSTR 	DEX 	CON 	INT 	WIS 	CHA\r\n16 (+3) 	13 (+1) 	14 (+2) 	10 (+0) 	11 (+0) 	10 (+0)\r\n\r\nSkills Athletics +5, Perception +2\r\n\r\nSenses passive Perception 12\r\n\r\nLanguages any one language (usually Common)\r\n\r\nChallenge 3 (700 XP)\r\n\r\nActions\r\n\r\nMultiattack. The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack.\r\n\r\nLongsword. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.\r\n\r\nShortsword. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage. Heavy Crossbow. Ranged Weapon Attack: +3 to hit, range 100/400 ft., one target. Hit: 6 (1d10 + 1) piercing damage.'),
(3, 'Bandit captain', 30, 100, 15, 3, 'Speed 30 ft.\r\nSTR 	DEX 	CON 	INT 	WIS 	CHA\r\n15 (+2) 	16 (+3) 	14 (+2) 	14 (+2) 	11 (+0) 	14 (+2)\r\n\r\nSaving Throws Str +4, Dex +5, Wis +2\r\n\r\nSkills Athletics +4, Deception +4\r\n\r\nSenses passive Perception 10\r\n\r\nLanguages any two languages\r\n\r\nChallenge 2 (450 XP)\r\n\r\nActions\r\n\r\nMultiattack. The captain makes three melee attacks: two with its scimitar and one with its dagger. Or the captain makes two ranged attacks with its daggers.\r\n\r\nScimitar. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.\r\n\r\nDagger. Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage.\r\n\r\nReactions\r\n\r\nParry. The captain adds 2 to its AC against one melee attack that would hit it. To do so, the captain must see the attacker and be wielding a melee weapon.'),
(4, 'Owlbear', 28, 91, 13, 1, 'Speed 40 ft.\r\nSTR	DEX	CON	INT	WIS	CHA\r\n20 (+5)	12 (+1)	17 (+3)	3 (−4)	12 (+1)	7 (−2)\r\n\r\nSkills Perception +3\r\n\r\nSenses darkvision 60 ft., passive Perception 13\r\n\r\nLanguages —\r\n\r\nChallenge 3 (700 XP)\r\n\r\nKeen Sight and Smell. The owlbear has advantage on Wisdom (Perception) checks that rely on sight or smell.\r\n\r\nActions\r\n\r\nMultiattack. The owlbear makes two attacks: one with its beak and one with its claws.\r\n\r\nBeak. Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 10 (1d10 + 5) piercing damage.\r\n\r\nClaws. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.'),
(5, 'Harpy', 14, 66, 11, 1, 'Speed 20 ft., fly 40 ft.\r\nSTR 	DEX 	CON 	INT 	WIS 	CHA\r\n12 (+1) 	13 (+1) 	12 (+1) 	7 (−2) 	10 (+0) 	13 (+1)\r\n\r\nSenses passive Perception 10\r\n\r\nLanguages Common\r\n\r\nChallenge 1 (200 XP)\r\n\r\nActions\r\n\r\nMultiattack. The harpy makes two attacks: one with its claws and one with its club.\r\n\r\nClaws. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage.\r\n\r\nClub. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage.\r\n\r\nLuring Song. The harpy sings a magical melody. Every humanoid and giant within 300 feet of the harpy that can hear the song must succeed on a DC 11 Wisdom saving throw or be charmed until the song ends. The harpy must take a bonus action on its subsequent turns to continue singing. It can stop singing at any time. The song ends if the harpy is incapacitated. While charmed by the harpy, a target is incapacitated and ignores the songs of other harpies. If the charmed target is more than 5 feet away from the harpy, the target must move on its turn toward the harpy by the most direct route, trying to get within 5 feet. It doesn’t avoid opportunity attacks, but before moving into damaging terrain, such as lava or a pit, and whenever it takes damage from a source other than the harpy, the target can repeat the saving throw. A charmed target can also repeat the saving throw at the end of each of its turns. If the saving throw is successful, the effect ends on it. A target that successfully saves is immune to this harpy’s song for the next 24 hours.'),
(6, 'Assassin', 36, 120, 15, 3, 'Speed 30 ft.\r\nSTR 	DEX 	CON 	INT 	WIS 	CHA\r\n11 (+0) 	16 (+3) 	14 (+2) 	13 (+1) 	11 (+0) 	10 (+0)\r\n\r\nSaving Throws Dex +6, Int +4\r\n\r\nSkills Acrobatics +6, Deception +3, Perception +3, Stealth +9\r\n\r\nDamage Resistances poison\r\n\r\nSenses passive Perception 13\r\n\r\nLanguages Thieves’ cant plus any two languages\r\n\r\nChallenge 8 (3,900 XP)\r\n\r\nAssassinate. During its first turn, the assassin has advantage on attack rolls against any creature that hasn’t taken a turn. Any hit the assassin scores against a surprised creature is a critical hit.\r\n\r\nEvasion. If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.\r\n\r\nSneak Attack. Once per turn, the assassin deals an extra 14 (4d6) damage when it hits a target with a weapon attack and has advantage on the attack roll, or when the target is within 5 feet of an ally of the assassin that isn’t incapacitated and the assassin doesn’t have disadvantage on the attack roll.\r\n\r\nActions\r\n\r\nMultiattack. The assassin makes two shortsword attacks.\r\n\r\nShortsword. Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.\r\n\r\nLight Crossbow. Ranged Weapon Attack: +6 to hit, range 80/320 ft., one target. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.'),
(8, 'Harpy (Mage)', 14, 63, 11, 1, 'Speed 20 ft., fly 40 ft.\r\nSTR	DEX	CON	INT	WIS	CHA\r\n12 (+1)	13 (+1)	12 (+1)	7 (−2)	10 (+0)	13 (+1)\r\nSenses passive Perception 10\r\n\r\nLanguages Common\r\n\r\nChallenge 1 (200 XP)\r\n\r\nSpellcasting. The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:\r\n\r\nCantrips (at will): fire bolt, light, mage hand, prestidigitation\r\n\r\n1st level (4 slots): detect magic, mage armor, magic missile, shield\r\n\r\nActions\r\n\r\nMultiattack. The harpy makes two attacks: one with its claws and one with its club.\r\n\r\nClaws. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage.\r\n\r\nClub. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage.\r\n\r\nLuring Song. The harpy sings a magical melody. Every humanoid and giant within 300 feet of the harpy that can hear the song must succeed on a DC 11 Wisdom saving throw or be charmed until the song ends. The harpy must take a bonus action on its subsequent turns to continue singing. It can stop singing at any time. The song ends if the harpy is incapacitated. While charmed by the harpy, a target is incapacitated and ignores the songs of other harpies. If the charmed target is more than 5 feet away from the harpy, the target must move on its turn toward the harpy by the most direct route, trying to get within 5 feet. It doesn’t avoid opportunity attacks, but before moving into damaging terrain, such as lava or a pit, and whenever it takes damage from a source other than the harpy, the target can repeat the saving throw. A charmed target can also repeat the saving throw at the end of each of its turns. If the saving throw is successful, the effect ends on it. A target that successfully saves is immune to this harpy’s song for the next 24 hours.'),
(9, 'Mage', 9, 72, 12, 2, 'Speed 30 ft.\r\nSTR	DEX	CON	INT	WIS	CHA\r\n9 (−1)	14 (+2)	11 (+0)	17 (+3)	12 (+1)	11 (+0)\r\nSaving Throws Int +6, Wis +4\r\n\r\nSkills Arcana +6, History +6\r\n\r\nSenses passive Perception 11\r\n\r\nLanguages any four languages\r\n\r\nChallenge 6 (2,300 XP)\r\n\r\nSpellcasting. The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared:\r\n\r\nCantrips (at will): fire bolt, light, mage hand, prestidigitation\r\n\r\n1st level (4 slots): detect magic, mage armor, magic missile, shield\r\n\r\n2nd level (3 slots): misty step, suggestion\r\n\r\n3rd level (3 slots): counterspell, fireball, fly\r\n\r\n4th level (3 slots): greater invisibility, ice storm\r\n\r\n5th level (1 slot): cone of cold\r\n\r\nActions\r\n\r\nDagger. Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage.\r\n\r\nMages spend their lives in the study and practice of magic. Good-aligned mages offer counsel to nobles and others in power, while evil mages dwell in isolated sites to perform unspeakable experiments without interference.'),
(10, 'Drow', 3, 24, 15, 2, 'Speed 30 ft.\r\n\r\nSTR	DEX	CON	INT	WIS	CHA\r\n10 (+0)	14 (+2)	10 (+0)	11 (+0)	11 (+0)	12 (+1)\r\nSkills Perception +2, Stealth +4\r\n\r\nSenses darkvision 120 ft., passive Perception 12\r\n\r\nLanguages Elvish, Undercommon\r\n\r\nChallenge 1/4 (50 XP)\r\n\r\nFey Ancestry. The drow has advantage on saving throws against being charmed, and magic can’t put the drow to sleep.\r\n\r\nInnate Spellcasting. The drow’s spellcasting ability is Charisma (spell save DC 11). It can innately cast the following spells, requiring no material components:\r\n\r\nAt will: dancing lights\r\n\r\n1/day each: darkness, faerie fire\r\n\r\nSunlight Sensitivity. While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.\r\n\r\nActions\r\n\r\nShortsword. Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.\r\n\r\nHand Crossbow. Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing310 damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the saving throw fails by 5 or more, the target is also unconscious while poisoned in this way. The target wakes up if it takes damage or if another creature takes an action to shake it awake.');

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
(1, 'Voxel Pixel', 17),
(2, 'Krasnalio', 19),
(3, 'Dwarlock', 13);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=532;

--
-- AUTO_INCREMENT for table `enemies`
--
ALTER TABLE `enemies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
