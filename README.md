# 📌 Subscription Tracker (Backend)

Subscription Tracker is a backend-only project that helps users manage their subscriptions effectively.  
It allows users to track active subscriptions, schedule automated email reminders for renewals, and securely manage authentication.  
This project focuses entirely on backend functionalities with no frontend implementation.

---

## 🕹️ Features

- Secure user authentication with JWT.
- Add, update, and manage subscriptions.
- Automated email reminders before renewal dates.
- Error handling and logging for reliable operations.
- Modular and scalable backend architecture.
- 📧 Email Notifications:
  - Uses Nodemailer to send email reminders for upcoming subscription renewals.
  - Emails are triggered automatically by Upstash QStash for timely scheduling.

---

## 🚀 Tech Stack

- **Programming Language**: JavaScript  
- **Runtime Environment**: Node.js  
- **Frameworks**: Express.js (for building REST APIs)  
- **Database**: MongoDB (using Mongoose for object modelling)  
- **Authentication**: JSON Web Tokens (JWT)  
- **Email Service**: Nodemailer  
- **Task Scheduling / Automation**: Upstash QStash  
- **Environment Management**: dotenv (for `.env` files)  
- **Version Control**: Git (hosted on GitHub)  
- **Package Manager**: npm  
- **Development Tools**: WebStorm IDE
- **API Testing tool**: Postman or HTTPie

---

## 🪝 Modules used

### Third-Party Modules:
- express (Web framework)
- mongoose (MongoDB object modeling)
- jsonwebtoken (JWT authentication)
- nodemailer (Email service)
- dayjs (Date manipulation)
- upstash-qstash (Task scheduling/automation)

### Development Modules:
- nodemon (Development server auto-reloading)

---

## 🛠️ Tools Used

### 🔹 Arcjet  
- Provides **security and access control** for APIs.  
- Helps in **rate limiting, abuse prevention, and authentication checks**.  

### 🔹 Upstash QStash (Workflow Automation)  
- A **serverless message queue & task scheduler**.  
- Used here for **automated reminders and scheduled emails** (e.g., subscription renewal alerts).  

### 🔹 Nodemailer  
- A **Node.js email service** library.  
- Used to **send subscription-related notifications and reminders** directly to user inboxes.  

---

## 📂 Project Structure

```bash
├── src/
│   ├── config/
│   │   └── arcjet.js   
│   │   └── env.js             
|   |   └── nodemailer.js
|   |   └── upstash.js
│   ├── controllers/
│   │   ├── auth.controller.js 
│   │   └── subscription.controller.js
│   │   └── user.controller.js
│   │   └── workflow.controller.js 
│   ├── database/
│   │   ├── mongodb.js
│   ├── models/
│   │   └── Subscription.js
│   ├── middlewares/
│   │   ├── arcjet.middleware.js
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   ├── models/
│   │   ├── subscription.model.js
│   │   ├── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── subscription.routes.js
│   │   ├── user.routes.js
│   │   ├── workflow.routes.js
│   ├── utils/
│   │   ├── email.template.js
│   │   ├── send-email.js
├── app.js                       # Express app setup
├── .env.development.local       # Development-specific environment variables
├── package.json                 # npm dependencies and scripts
├── package-lock.json            # npm lock file
```

## 🗂️ Environment Variables

Create a `.env` file in the root directory and configure it as below:

```bash
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI="<url for database>"

# JWT AUTH
JWT_SECRET="secret key"
JWT_EXPIRES_IN="<expiration date for jwt token>" # eg: "1d"

# ARCJET
ARCJET_KEY="<arcjet key>"
ARCJET_ENV="development"

# UPSTASH: automated email service
QSTASH_URL=<url_for_qstash>
QSTASH_TOKEN=<upstash_token>
```
