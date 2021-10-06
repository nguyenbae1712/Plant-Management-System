CREATE DATABASE  IF NOT EXISTS `db_plantsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_plantsystem`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: db_plantsystem
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bo`
--

DROP TABLE IF EXISTS `bo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bo` (
  `idBo` int unsigned NOT NULL AUTO_INCREMENT,
  `Ten_KH` varchar(50) NOT NULL,
  `Ten_Latin` varchar(50) NOT NULL,
  `Mo_ta` varchar(100) DEFAULT NULL,
  `idLop` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idBo`),
  KEY `fk_bo` (`idLop`),
  CONSTRAINT `fk_bo` FOREIGN KEY (`idLop`) REFERENCES `lop` (`idLop`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bo`
--

LOCK TABLES `bo` WRITE;
/*!40000 ALTER TABLE `bo` DISABLE KEYS */;
/*!40000 ALTER TABLE `bo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cay`
--

DROP TABLE IF EXISTS `cay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cay` (
  `idCay` int unsigned NOT NULL AUTO_INCREMENT,
  `Noi_Lay` varchar(50) DEFAULT NULL,
  `Noi_Moc` varchar(50) DEFAULT NULL,
  `So_Luong` varchar(50) DEFAULT NULL,
  `Khu_Vuc_Sinh_Truong` varchar(50) DEFAULT NULL,
  `Loai_Moc_Cung` varchar(50) DEFAULT NULL,
  `Dac_Tinh_Sinh_Thai` varchar(50) DEFAULT NULL,
  `Chieu_Cao` varchar(50) DEFAULT NULL,
  `Duong_Kinh` varchar(50) DEFAULT NULL,
  `Kinh_Do` varchar(50) DEFAULT NULL,
  `Vi_Do` varchar(50) DEFAULT NULL,
  `idLoai` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idCay`),
  KEY `fk_cay` (`idLoai`),
  CONSTRAINT `fk_cay` FOREIGN KEY (`idLoai`) REFERENCES `loai` (`idLoai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cay`
--

LOCK TABLES `cay` WRITE;
/*!40000 ALTER TABLE `cay` DISABLE KEYS */;
/*!40000 ALTER TABLE `cay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi`
--

DROP TABLE IF EXISTS `chi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chi` (
  `idChi` int unsigned NOT NULL AUTO_INCREMENT,
  `Ten_KH` varchar(50) NOT NULL,
  `Ten_Latin` varchar(50) NOT NULL,
  `Mo_ta` varchar(100) DEFAULT NULL,
  `idHo` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idChi`),
  KEY `fk_chi` (`idHo`),
  CONSTRAINT `fk_chi` FOREIGN KEY (`idHo`) REFERENCES `ho` (`idHo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi`
--

LOCK TABLES `chi` WRITE;
/*!40000 ALTER TABLE `chi` DISABLE KEYS */;
/*!40000 ALTER TABLE `chi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hinhanh`
--

DROP TABLE IF EXISTS `hinhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinhanh` (
  `idHinh` int unsigned NOT NULL AUTO_INCREMENT,
  `URL` varchar(50) DEFAULT NULL,
  `idLoai` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idHinh`),
  KEY `fk_hinhanh` (`idLoai`),
  CONSTRAINT `fk_hinhanh` FOREIGN KEY (`idLoai`) REFERENCES `loai` (`idLoai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinhanh`
--

LOCK TABLES `hinhanh` WRITE;
/*!40000 ALTER TABLE `hinhanh` DISABLE KEYS */;
/*!40000 ALTER TABLE `hinhanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ho`
--

DROP TABLE IF EXISTS `ho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ho` (
  `idHo` int unsigned NOT NULL AUTO_INCREMENT,
  `Ten_KH` varchar(50) NOT NULL,
  `Ten_Latin` varchar(50) NOT NULL,
  `Mo_ta` varchar(100) DEFAULT NULL,
  `idBo` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idHo`),
  KEY `fk_ho` (`idBo`),
  CONSTRAINT `fk_ho` FOREIGN KEY (`idBo`) REFERENCES `bo` (`idBo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ho`
--

LOCK TABLES `ho` WRITE;
/*!40000 ALTER TABLE `ho` DISABLE KEYS */;
/*!40000 ALTER TABLE `ho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai`
--

DROP TABLE IF EXISTS `loai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai` (
  `idLoai` int unsigned NOT NULL AUTO_INCREMENT,
  `Ten_KH` varchar(50) NOT NULL,
  `Ten_TV_Khac` varchar(50) DEFAULT NULL,
  `Ten_Latin` varchar(50) NOT NULL,
  `Ten_Latin_Khac` varchar(50) DEFAULT NULL,
  `Dac_Diem_Nhan_Dang` varchar(50) DEFAULT NULL,
  `Sinh_Hoc_Sinh_Thai` varchar(50) DEFAULT NULL,
  `Phan_Bo` varchar(50) DEFAULT NULL,
  `Gia_Tri` varchar(50) DEFAULT NULL,
  `Tinh_Trang` varchar(50) DEFAULT NULL,
  `Bien_Phap_BV` varchar(50) DEFAULT NULL,
  `Danh_Song` varchar(100) DEFAULT NULL,
  `idChi` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idLoai`),
  KEY `fk_loai` (`idChi`),
  CONSTRAINT `fk_loai` FOREIGN KEY (`idChi`) REFERENCES `chi` (`idChi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai`
--

LOCK TABLES `loai` WRITE;
/*!40000 ALTER TABLE `loai` DISABLE KEYS */;
/*!40000 ALTER TABLE `loai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lop`
--

DROP TABLE IF EXISTS `lop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lop` (
  `idLop` int unsigned NOT NULL AUTO_INCREMENT,
  `Ten_KH` varchar(50) NOT NULL,
  `Ten_Latin` varchar(50) NOT NULL,
  `Mo_ta` varchar(100) DEFAULT NULL,
  `idNganh` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idLop`),
  KEY `fk_lop` (`idNganh`),
  CONSTRAINT `fk_lop` FOREIGN KEY (`idNganh`) REFERENCES `nganh` (`idNganh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lop`
--

LOCK TABLES `lop` WRITE;
/*!40000 ALTER TABLE `lop` DISABLE KEYS */;
/*!40000 ALTER TABLE `lop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nganh`
--

DROP TABLE IF EXISTS `nganh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nganh` (
  `idNganh` int unsigned NOT NULL,
  `Ten_KH` varchar(50) NOT NULL,
  `Ten_Latin` varchar(50) NOT NULL,
  `Mo_ta` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idNganh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nganh`
--

LOCK TABLES `nganh` WRITE;
/*!40000 ALTER TABLE `nganh` DISABLE KEYS */;
/*!40000 ALTER TABLE `nganh` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-06 18:12:48
