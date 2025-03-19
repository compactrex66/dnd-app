-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2025 at 02:55 PM
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
(1, 'Voxel Pixel', 50, 50, 17, 6, 1, NULL, 0),
(2, 'Krasnalio', 50, 50, 21, 7, 1, NULL, 0),
(3, 'Dwarlock', 50, 50, 14, 10, 1, NULL, 0),
(619, 'Gnoll Demoniac1', 111, 111, 16, 8, 0, 44, 0),
(620, 'Gnoll Fang of Yeenoghu2', 44, 44, 14, 16, 0, 45, 0),
(621, 'Gnoll Fang of Yeenoghu3', 83, 83, 14, 3, 0, 45, 0),
(622, 'Gnoll Fang of Yeenoghu4', 92, 92, 14, 18, 0, 45, 0),
(623, 'Gnoll Pack Lord5', 71, 71, 15, 18, 0, 46, 0);

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
(46, 'Gnoll Pack Lord', 18, 81, 15, 2, '___\r\n>## Gnoll Pack Lord\r\n>*Medium Fiend, chaotic evil*\r\n>___\r\n>- **Armor Class** 15\r\n>- **Hit Points** 49 (9d8 + 9)\r\n>- **Speed** 30 ft.\r\n>___\r\n>|STR|DEX|CON|INT|WIS|CHA|\r\n>|:---:|:---:|:---:|:---:|:---:|:---:|\r\n>|16 (+3)|14 (+2)|13 (+1)|8 (-1)|11 (+0)|9 (-1)|\r\n>___\r\n>- **Senses** Darkvision 60 ft., passive Perception 10\r\n>- **Languages** Gnoll\r\n>- **Challenge** 2 (XP 450; PB +2)\r\n>- **Proficiency Bonus** +2\r\n>___\r\n>### Actions\r\n>***Multiattack.*** The gnoll makes two attacks, using Bone Whip or Bone Javelin in any combination, and it uses Incite Rampage if available.  \r\n>\r\n>***Bone Whip.*** *Melee Attack Roll:*  +5, reach 10 ft. *Hit:* 8 (2d4 + 3) Slashing damage.  \r\n>\r\n>***Bone Javelin.*** *Ranged Attack Roll:*  +5, range 30/120 ft. *Hit:* 7 (1d8 + 3) Piercing damage.  \r\n>\r\n>***Incite Rampage (Recharge 5–6).*** The gnoll targets another creature it can see within 60 feet of itself that has the Rampage Bonus Action. The target can take a Reaction to make one melee attack.  \r\n>\r\n>### Bonus Actions\r\n>***Rampage (2/Day).*** Immediately after dealing damage to a creature that is already Bloodied, the gnoll moves up to half its Speed, and it makes one Bone Whip attack.');

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
(1, '1571-08-14', 14, 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=624;

--
-- AUTO_INCREMENT for table `enemies`
--
ALTER TABLE `enemies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `time`
--
ALTER TABLE `time`
  MODIFY `time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
