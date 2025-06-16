

---

## 🏠 RentWise Backend (Express + MongoDB)

Welcome to the RentWise project! This is a smart property management backend where landlords (admins) and tenants (users) can interact through rent tracking, maintenance requests, and more.

---

## 🧰 Tech Stack

* **Node.js** with **Express**
* **MongoDB** using **Mongoose**
* **JWT** for authentication
* **REST API**

---

## 🧑🏾‍💻 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Racheal777/RentWise-API.git
cd rentwise-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

Create a `.env` file at the root of the project:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=supersecretkey
```

### 4. Run the Server

```bash
npm run dev
```

---

## 🗂️ Folder Structure

```
rentwise-backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── schemas
├── .env
└── index.js
```

---

## 🌿 Git Workflow – No Chaos Allowed

We're using a **feature-branch workflow** with pull requests. Here's how to keep things clean:

### 1. Don’t Push to `master`

All work must go through a pull request from a feature branch.

### 2. Create a New Branch

Branch names should match the task you're working on (refer to GitHub Issues):

```bash
git checkout -b feature/auth
# OR
git checkout -b fix/maintenance-status
```

### 3. Make Your Changes Locally

Write clean code and make sure it runs.

> If you're touching multiple files, commit often with clear messages:

```bash
git add .
git commit -m "Added login route with JWT token"
```

### 4. Push to GitHub

```bash
git push origin feature/auth
```

### 5. Open a Pull Request

* Go to GitHub
* Open a Pull Request **from your branch** into `main`
* Link it to the related issue (e.g. `Closes #2`)
* Ask for a review in the team Slack or WhatsApp

---

## ✅ PR Checklist

Before submitting a PR, make sure:

* [ ] Your code runs (`npm run dev`)
* [ ] You've pulled latest `master` and resolved any conflicts
* [ ] Your feature matches the task assigned
* [ ] Your commit messages are clean

---

## 📌 Helpful Commands

```bash
# Check what branch you're on
git branch

# Pull latest changes from main
git checkout master
git pull origin main

# Merge main into your branch to resolve conflicts early
git checkout feature/your-feature
git merge master
```

---

## 📣 Need Help?

Ask in the group chat before pushing broken code 🙏. We all want to succeed and grow together — this is how.




