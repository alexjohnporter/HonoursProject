
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `Honours`
--

-- --------------------------------------------------------

--
-- Table structure for table `header`
--

CREATE TABLE IF NOT EXISTS `header` (
`hdrID` int(11) NOT NULL,
  `hdrTxt` varchar(80) COLLATE utf8_bin NOT NULL,
  `author` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `fbIcon` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `twitIcon` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=2 ;

--
-- Dumping data for table `header`
--

INSERT INTO `header` (`hdrID`, `hdrTxt`, `author`, `fbIcon`, `twitIcon`) VALUES
(1, 'Header', 'author', 'http://facebook.com', 'http://twitter.com');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE IF NOT EXISTS `items` (
`itemID` int(11) NOT NULL,
  `itemName` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `itemTxt` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `AddressOne` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `AddressTwo` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `Postcode` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `itemImg` varchar(100) COLLATE utf8_bin NOT NULL,
  `timeID` int(1) NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=21 ;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
`reviewID` int(11) NOT NULL,
  `reviewIP` int(11) NOT NULL,
  `reviewerName` varchar(25) COLLATE utf8_bin NOT NULL,
  `reviewerEmail` varchar(50) COLLATE utf8_bin NOT NULL,
  `reviewComment` varchar(500) COLLATE utf8_bin NOT NULL,
  `reviewDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `itemID` int(11) NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=27 ;


-- --------------------------------------------------------

--
-- Table structure for table `timing`
--

CREATE TABLE IF NOT EXISTS `timing` (
`timeID` int(11) NOT NULL,
  `Mon` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `MonClose` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `Tues` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `TuesClose` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `Wed` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `WedClose` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `Thurs` varchar(5) COLLATE utf8_bin NOT NULL,
  `ThursClose` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `Fri` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `FriClose` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `Sat` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `SatClose` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `Sun` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `SunClose` varchar(5) COLLATE utf8_bin DEFAULT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=6 ;

--
-- Dumping data for table `timing`
--

INSERT INTO `timing` (`timeID`, `Mon`, `MonClose`, `Tues`, `TuesClose`, `Wed`, `WedClose`, `Thurs`, `ThursClose`, `Fri`, `FriClose`, `Sat`, `SatClose`, `Sun`, `SunClose`) VALUES
(1, '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00'),
(2, 'Close', 'Close', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00'),
(3, '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00'),
(4, '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00'),
(5, '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00', '10:00', '17:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `header`
--
ALTER TABLE `header`
 ADD PRIMARY KEY (`hdrID`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
 ADD PRIMARY KEY (`itemID`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
 ADD PRIMARY KEY (`reviewID`);

--
-- Indexes for table `timing`
--
ALTER TABLE `timing`
 ADD PRIMARY KEY (`timeID`);


--
-- AUTO_INCREMENT for table `header`
--
ALTER TABLE `header`
MODIFY `hdrID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
MODIFY `itemID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
MODIFY `reviewID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `timing`
--
ALTER TABLE `timing`
MODIFY `timeID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
