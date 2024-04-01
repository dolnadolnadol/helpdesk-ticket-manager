-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: ticket
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contact` varchar(100) NOT NULL,
  `Create_Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Timestamp` timestamp NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'hello','description','saiparnchollada@gmail.com','2024-03-29 19:27:35','2023-04-09 20:39:37','resolved'),(31,'ปัญหาการเชื่อมต่อเครือข่าย','ไม่สามารถเชื่อมต่อกับเครือข่ายของบริษัทจากเครื่องคอมพิวเตอร์ของฉันได้','user1@example.com','2024-03-30 21:43:55',NULL,'pending'),(32,'ปัญหาการติดตั้งซอฟต์แวร์','พบข้อผิดพลาดขณะติดตั้งอัปเดตซอฟต์แวร์ใหม่','user2@example.com','2024-03-30 21:53:55',NULL,'pending'),(33,'เครื่องพิมพ์ไม่ทำงาน','เครื่องพิมพ์ในออฟฟิศไม่พิมพ์เอกสารใด ๆ','user3@example.com','2024-03-30 21:43:55','2024-03-31 14:04:34','rejected'),(34,'ข้อผิดพลาดในการกำหนดค่าอีเมล','ไม่สามารถส่ง/รับอีเมลหลังจากกำหนดค่าไคลเอ็นต์อีเมลได้','user4@example.com','2024-03-30 23:43:55','2023-04-09 20:39:37','rejected'),(35,'ปัญหาการสูญเสียข้อมูล','ไฟล์ที่สำคัญดูเหมือนจะหายไปจากเซิร์ฟเวอร์','user5@example.com','2024-03-31 00:43:55','2023-04-09 20:39:37','resolved'),(36,'ปัญหาการเชื่อมต่ออินเทอร์เน็ต','ไม่สามารถเข้าสู่อินเทอร์เน็ตได้จากเครื่องของฉัน','user6@example.com','2024-03-31 03:43:55',NULL,'pending'),(37,'เครื่องพิมพ์พิมพ์สีผิด','สีที่ออกมาจากเครื่องพิมพ์ไม่ถูกต้องตามที่ต้องการ','user7@example.com','2024-03-30 21:13:55',NULL,'pending'),(38,'คีย์บอร์ดไม่ทำงาน','มีปัญหาในการใช้งานคีย์บอร์ดของคอมพิวเตอร์','user8@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','accepted'),(39,'อินเทอร์เฟซผู้ใช้ไม่มีการตอบสนอง','ไม่สามารถคลิกที่ปุ่มหรือปฏิกรณ์ใด ๆ บนอินเทอร์เฟซ','user9@example.com','2024-01-31 21:43:55','2023-04-09 20:39:37','rejected'),(40,'ปัญหาการรันแอปพลิเคชัน','แอปพลิเคชันไม่สามารถเรียกใช้งานหรือทำงานอย่างถูกต้อง','user10@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','resolved'),(41,'ปัญหาการเชื่อมต่อ VPN','ไม่สามารถเชื่อมต่อ VPN เพื่อเข้าถึงเครือข่ายของบริษัท','user11@example.com','2024-03-20 21:43:55',NULL,'pending'),(42,'คอมพิวเตอร์ช้ามาก','คอมพิวเตอร์มีปัญหาในการประมวลผลและการทำงานช้า','user12@example.com','2024-03-30 21:43:55',NULL,'pending'),(43,'ปัญหาการเชื่อมต่อกับโทรศัพท์มือถือ','ไม่สามารถเชื่อมต่อกับโทรศัพท์มือถือเพื่อแชร์ข้อมูล','user13@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','accepted'),(44,'ปัญหาการใช้งานอินเทอร์เน็ตในสำนักงาน','ไม่สามารถเข้าสู่เว็บไซต์หรือใช้บริการอินเทอร์เน็ตได้ในสำนักงาน','user14@example.com','2024-03-09 21:43:55','2023-04-09 20:39:37','rejected'),(45,'อุปกรณ์ไม่ทำงาน','อุปกรณ์ที่ใช้งานในการทำงานปกติไม่ทำงานแล้ว','user15@example.com','2023-03-30 21:43:55','2023-04-09 20:39:37','resolved'),(46,'ปัญหาการสูญเสียข้อมูลส่วนบุคคล','ข้อมูลส่วนบุคคลในคอมพิวเตอร์หายไป','user16@example.com','2024-03-30 21:43:55',NULL,'pending'),(47,'ปัญหาการใช้งานซอฟต์แวร์','ไม่สามารถใช้งานซอฟต์แวร์ที่ต้องการได้','user17@example.com','2024-03-30 21:43:55',NULL,'pending'),(48,'ปัญหาในการเข้าสู่ระบบ','ไม่สามารถเข้าสู่ระบบคอมพิวเตอร์ได้','user18@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','accepted'),(49,'ข้อความแบบเฉพาะเจาะจง','รับข้อความแปลก ๆ จากโปรแกรมหรืออุปกรณ์อื่น ๆ','user19@example.com','2024-06-15 21:43:55','2023-04-09 20:39:37','rejected'),(50,'ปัญหาการเชื่อมต่ออินเทอร์เน็ตบนโทรศัพท์มือถือ','ไม่สามารถเชื่อมต่ออินเทอร์เน็ตบนโทรศัพท์มือถือได้','user20@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','resolved'),(51,'ปัญหาในการเปิดเครื่องคอมพิวเตอร์','ไม่สามารถเปิดเครื่องคอมพิวเตอร์ได้','user21@example.com','2024-03-30 21:43:55',NULL,'pending'),(52,'ปัญหาในการเข้าถึงเอกสาร','ไม่สามารถเข้าถึงเอกสารที่ต้องการได้','user22@example.com','2024-03-30 21:43:55',NULL,'pending'),(53,'อุปกรณ์หยุดทำงานอย่างไม่มีเหตุผล','อุปกรณ์หยุดทำงานโดยไม่มีเหตุผลที่ชัดเจน','user23@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','accepted'),(54,'ปัญหาการสมัครสมาชิก','ไม่สามารถสมัครสมาชิกหรือเข้าสู่ระบบบัญชีผู้ใช้','user24@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','rejected'),(55,'การสูญเสียข้อมูลที่มีความสำคัญ','ข้อมูลที่สำคัญได้หายไปจากระบบ','user25@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','resolved'),(56,'ปัญหาการใช้งานเครื่องพิมพ์','ไม่สามารถใช้งานเครื่องพิมพ์เพื่อพิมพ์เอกสารได้','user26@example.com','2024-03-30 21:43:55',NULL,'pending'),(57,'ปัญหาในการส่งอีเมล','ไม่สามารถส่งอีเมลได้','user27@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','rejected'),(58,'เครื่องคอมพิวเตอร์ไม่ทำงานเมื่อเริ่มต้น','เครื่องคอมพิวเตอร์ไม่ทำงานเมื่อเริ่มต้น','user28@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','accepted'),(59,'ปัญหาในการใช้งานโปรแกรม','มีปัญหาในการใช้งานโปรแกรมหรือแอปพลิเคชันบางอย่าง','user29@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','rejected'),(60,'ปัญหาการเชื่อมต่ออินเทอร์เน็ตบนคอมพิวเตอร์','ไม่สามารถเชื่อมต่ออินเทอร์เน็ตบนคอมพิวเตอร์ได้','user30@example.com','2024-03-30 21:43:55','2023-04-09 20:39:37','resolved');
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ticket'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01  1:59:00
