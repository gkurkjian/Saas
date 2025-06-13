# 🚀 SaaS Authentication App – Next.js 15 + React 19 + MongoDB + JWT

A full-stack authentication system built using the latest **Next.js 15.3.3**, **React 19.1.0**, **React Bootstrap**, **MongoDB**, and **JWT**.  
It allows users to **register**, **log in**, and access a protected **dashboard** via **token-based authentication**.

---

## 📦 Tech Stack

- ✅ **Next.js 15.3.3**
- ✅ **React 19.1.0**
- ✅ **React Bootstrap 2.10.10**
- ✅ **MongoDB (NoSQL)** + **Mongoose**
- ✅ **JWT Authentication**
- ✅ **bcryptjs** – Secure password hashing
- ✅ **jsonwebtoken** – Create/verify tokens
- ✅ **jwt-decode** – Decode JWTs client-side
- ✅ **LocalStorage** token storage (`access_token`)

---

## ✨ Features

### 🔐 User Registration

- Inputs: Full Name, Username, Password
- Passwords hashed using `bcryptjs`
- Checks for existing usernames
- On success:
  - JWT token is generated
  - Stored in `localStorage` as `access_token`
  - User redirected to `/dashboard`

### 🔐 User Login

- Authenticates with username and password
- Token is signed with your `JWT_SECRET`
- Token includes: `userId`, `userName`, `role`, `exp`
- Stored in `localStorage` as `access_token`

### 🧠 Token Handling

Centralized in `lib/authenticateUser.js`:

- `setToken(token)` – Store token in `localStorage`
- `getToken()` – Read token from `localStorage`
- `readToken()` – Decode and validate token
- `removeToken()` – Remove token
- `isAuthenticated()` – Check expiry

### 🔒 Protected Dashboard

- Route `/dashboard` checks token on page load
- If token is missing or expired, redirects to `/login`
- Displays "Welcome, [username]!" using token data

---

## 🗂 Folder Structure

```
/pages
  ├── index.js            # Landing page
  ├── login.js            # Login screen
  ├── register.js         # Registration screen
  ├── dashboard.js        # Protected route
  └── api
      └── auth
          ├── login.js    # POST login
          └── register.js # POST register

/lib
  ├── user-auth.js        # Mongoose model + helper functions
  └── authenticateUser.js # Token utility functions
```

---

## ⚙️ Environment Variables

Create a `.env.local` file at your project root:

```env
MONGO_DB_CONNECTION=your_mongodb_connection_string
JWT_SECRET=your_super_long_random_string_1234567890!@#$%^
```

Then restart the dev server:

```bash
npm run dev
```

---

## 💻 How to Run

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Visit your app at:

```
http://localhost:3000
```

✅ MongoDB must be running locally or your remote URI should be correct in `.env.local`.

---

## 🧪 Demo Credentials

Use this account without registering:

```
Username: bob
Password: myPassword
```

---

## 🛡 Security Notice

- Tokens are stored in `localStorage` for simplicity.
- For production, consider storing tokens in **httpOnly cookies** for better security.
- Keep `JWT_SECRET` long and private.

---

## 📄 License

MIT – Free to use and adapt.

---

## ❤️ Contribute

PRs and suggestions welcome. Build your SaaS faster, safer, better!
