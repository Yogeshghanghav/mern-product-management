# mern-product-management

![MERN](https://img.shields.io/badge/MERN-Stack-1abc9c?style=for-the-badge&logo=mongodb&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-ffca28?style=for-the-badge)
![LICENSE](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)

##Overview

This project is developed as part of an internship assignment.

It demonstrates:

> User Authentication  
> JWT Authorization  
> Role-based Access Control  
> Products CRUD API  
> Protected Routes  
> React Frontend Integration  
> Clean UI Dashboard

---

### Frontend

- React
- Fetch API
- CSS (Custom Styling)
- LocalStorage Auth Handling

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)
- Joi (Validation)

---

## Authentication & Authorization Flow

```
User Registers/Login
        |
  Server validates
        |
JWT Token Generated
        |
Token stored in LocalStorage
        |
Protected Routes Access
(Admin Only CRUD)
```

---

## Folder Structure

```
project/
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Middlewares/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── api.js
    │   ├── styles.css
    │   └── index.js
    └── public/
```

### Backend

```
cd backend
npm install
npm start
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=3000
```

---

### Frontend

```
cd frontend
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

## API Endpoints

### Auth

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | /api/v1/auth/register | Register user |
| POST   | /api/v1/auth/login    | Login user    |

### Products

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | /api/v1/products     | Get products           |
| POST   | /api/v1/products     | Create product (Admin) |
| PUT    | /api/v1/products/:id | Update product (Admin) |
| DELETE | /api/v1/products/:id | Delete product (Admin) |

---

## Frontend Features

> Login / Register  
> JWT-based Authentication  
> Product Dashboard  
> Create Product (Admin)  
> Edit Product (Admin)  
> Delete Product (Admin)  
> Logout

```

##  Demo Flow (What reviewer should check)

1. Register
2. Login
3. Add Product (Admin)
4. Edit Product
5. Delete Product
6. Logout

---

##  Why This Submission Stands Out

✔ Clean and structured code
✔ Full authentication flow
✔ Proper validation
✔ Protected APIs
✔ Frontend + Backend integration
✔ Industry-standard patterns

---
##  Screenshots

```

screenshots/
1_register.png
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/64658d87-aa2e-434d-b6f1-3867b20339c2" />
2_login.png
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/4287f0c0-a6c9-41f4-b73b-a68647373cff" />
3_dashboard.png
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/f82e7211-d435-4586-8d74-41e6728e1058" />
4_create.png
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3911a5d3-1e5b-4109-a9f6-eac7c624cf33" />
5_update.png
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3b51bdf8-c2e7-4af3-8cf5-d2627cefae55" />
6_delete.png
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/eea0f049-fce0-407c-930e-7b9e6ddeada8" />
7_UserDashboard.png
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d876fdb7-fef7-443b-8f03-039a3edc102d" />
