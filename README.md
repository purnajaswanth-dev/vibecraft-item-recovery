# 🧭 SRM Lost & Found – Smart Campus Item Recovery System

A full-stack web application built for **Vibecraft Hackathon 2026** to help students report, explore, and recover lost & found items on campus efficiently.

---

## 🚀 Live Demo
🎥 Demo Video: https://drive.google.com/file/d/1cz7XmYROCOXRAnEuCKJ31E1fkh6A-0tZ/view?usp=drivesdk

⚠️ This project is currently demonstrated via **local deployment**.

The application runs on:
http://localhost:8080

> Note: `localhost` is machine-specific and works only on the system where the backend server is running.  
> Judges can reproduce the demo by following the setup instructions below.

A full demo video is provided to showcase all features.

---

## 🎯 Problem Statement
In large campuses, students frequently lose personal items like ID cards, wallets, chargers, earbuds, etc.  
Existing notice boards and WhatsApp groups are unstructured and inefficient.

---

## 💡 Our Solution
SRM Lost & Found is a centralized, smart platform that allows:
- Reporting lost and found items with images
- Searching items by location and type
- Viewing personal complaints in one place
- Smart matching of lost and found items with match percentage
- Direct contact via mobile number

---

## ✨ Key Features
- 🔐 Login & Signup system
- 📦 Raise Lost / Found item with image & contact
- 🔍 Explore campus items with filters
- 👤 Profile page with all user items
- 🤖 Smart matching engine (similarity score)
- 📱 Click-to-call contact support
- 🗑 Delete / Resolve complaints
- 🖼 Image preview overlay

---

## 🛠 Tech Stack
**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Java
- Spring Boot
- REST APIs
- Hibernate / JPA

**Database**
- H2 (In-Memory)

**Tools**
- GitHub
- VS Code
- Postman

---

## 🧠 Matching Logic (Brief)
Items are matched based on name similarity:
- Exact match → High score
- Partial match → Medium score
- No match → Low score

Matches are visually represented using **Green / Yellow / Red** indicators.

---

## 📂 Project Structure
backend/ └── Spring Boot backend frontend/ └── HTML, CSS, JS files
---

## 📸 Screenshots


<img width="1911" height="1073" alt="Screenshot 2026-02-01 081237" src="https://github.com/user-attachments/assets/233ee940-e686-4e5a-920b-e889283d507c" />
<img width="1911" height="1073"<img width="1916" height="1079" alt="Screenshot 2026-02-01 081321" src="https://github.com/user-attachments/assets/5a8a6ec3-e9d1-4817-9bee-5aa1c12778c2" />
 alt="Screenshot 2026-02-01 081237" src="https://gith<img width="1919" height="1079" alt="Screenshot 2026-02-01 081335" src="https://github.com/user-attachments/assets/95da8b34-1d82-47a2-86bf-6c0b49495e9d" />
ub.com/user-attachments/assets/0e37f0c5-3329-48a0-996<img width="1919" height="1079" alt="Screenshot 2026-02-01 081400" src="https://github.com/user-attachments/assets/efc1108b-ad1e-4d62-a20a-a9805540e081" />
1-f681177f2947" /><img width="1918" height="1078" alt="Screenshot 2026-02-01 081418" src="https://github.com/user-attachments/assets/dc7e9052-874e-4f07-9665-e1d9726acf33" />
<img width="1917" height="1079" alt="Screenshot 2026-02-01 081436" src="https://github.com/user-attachments/assets/13123a2d-6fec-4137-9108-4eab0497bfa0" />
<img width="1919" height="1079" alt="Screenshot 2026-02-01 081506" src="https://github.com/user-attachments/assets/5a4854fb-35ae-4a7a-ac5c-09e01ac6bfc8" />
<img width="1917" height="1079" alt="Screenshot 2026-02-01 081527" src="https://github.com/user-attachments/assets/ec41a401-8196-47c1-8a85-ad9d73f9ce80" />

---


## 🔁 Build Reproducibility Instructions

This project is designed for local execution.

### Backend
1. Install Java 17+
2. Clone the repository
3. Run:
   ./mvnw spring-boot:run
   (or mvnw.cmd on Windows)

Backend starts at:
http://localhost:8080

### Frontend
1. Open frontend/index.html in browser
2. Ensure backend is running

The frontend communicates with the backend using REST APIs on localhost.

## 🏁 Conclusion
This project demonstrates how simple, well-designed systems can solve real campus problems effectively.  
Built with focus on **clarity, usability, and real-world impact**.

---

⭐ If you like this project, please star the repository!
