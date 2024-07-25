# XO

## บทนำ
โปรเจ็กต์นี้เป็นเกม XO ที่พัฒนาโดยใช้ React สำหรับ frontend และ Node.js พร้อม Express สำหรับ backend ข้อมูลเกมจะถูกเก็บไว้ในฐานข้อมูล MySQL

## การตั้งค่าและรันโปรแกรม

### การตั้งค่า Backend

1. **ติดตั้ง XAMPP**: ดาวน์โหลดและติดตั้ง XAMPP [จากที่นี่](https://www.apachefriends.org/index.html)

2. **สร้างฐานข้อมูล**:
   - เปิด XAMPP Control Panel และเริ่ม Apache และ MySQL
   - เปิด phpMyAdmin ที่ `http://localhost/phpmyadmin`
   - สร้างฐานข้อมูลชื่อ `xo_game`

3. **เตรียมฐานข้อมูล**:
   - ใช้ MySQL Query ด้านล่างเพื่อสร้างตาราง:
     ```sql
     CREATE TABLE IF NOT EXISTS games (
       id INT AUTO_INCREMENT PRIMARY KEY,
       board TEXT,
       size INT,
       moves TEXT,
       winner VARCHAR(1),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. **ติดตั้ง Dependencies**:
   - เปิด Terminal/Command Prompt ไปที่โฟลเดอร์ `server`
   - รันคำสั่ง:
     ```bash
     npm install express mysql cors
     ```

5. **รัน Server**:
   - ในโฟลเดอร์ `server` รันคำสั่ง:
     ```bash
     node index.js
     ```

### การตั้งค่า Frontend

1. **ติดตั้ง Node.js และ npm**: ดาวน์โหลดและติดตั้ง Node.js [จากที่นี่](https://nodejs.org)

2. **ติดตั้ง Dependencies**:
   - เปิด Terminal/Command Prompt ไปที่โฟลเดอร์ `client`
   - รันคำสั่ง:
     ```bash
     npm install axios
     ```

3. **รัน React App**:
   - ในโฟลเดอร์ `client` รันคำสั่ง:
     ```bash
     npm start
     ```
   - เว็บแอปจะเปิดที่ `http://localhost:3000`

## การออกแบบโปรแกรม

- **Frontend (React)**: 
  - ใช้ React สำหรับการแสดงผล UI ของเกม
  - ใช้ Axios สำหรับการสื่อสารกับ backend
  - ออกแบบให้สามารถเลือกขนาดของกระดานเกม, เริ่มเกมใหม่, และดูประวัติของเกมที่เคยเล่น

- **Backend (Node.js + Express)**:
  - ใช้ Express สำหรับการจัดการ API ที่ให้บริการการบันทึกและดึงข้อมูลเกม
  - ข้อมูลเกมจะถูกเก็บในฐานข้อมูล MySQL

## อัลกอริธึมที่ใช้

1. **การสร้างกระดาน**:
   - ฟังก์ชัน `createBoard(size)` จะสร้างกระดานที่มีขนาดตามที่ระบุ

2. **การตรวจสอบผู้ชนะ**:
   - ฟังก์ชัน `checkWinner(board, size)` จะตรวจสอบการชนะในแต่ละแถว คอลัมน์ และเส้นทแยงมุม

3. **การบันทึกเกม**:
   - ข้อมูลเกมจะถูกบันทึกในฐานข้อมูลเมื่อมีผู้ชนะ

## การใช้ Git

- **สร้าง Repository**: สร้าง repository ใหม่ใน GitHub
- **เพิ่มไฟล์และคอมมิต**:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
