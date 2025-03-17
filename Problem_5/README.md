# 🛠️ Express TypeScript CRUD API

A simple RESTful API built with **ExpressJS**, **TypeScript**, **Prisma**, and **SQLite** to demonstrate basic CRUD operations.

---

## 🚀 Features

- Create a new resource
- List all resources with optional filters (e.g. by name)
- Get a specific resource by ID
- Update resource details
- Delete a resource

---

## 📆 Tech Stack

- **ExpressJS** – web server framework
- **TypeScript** – static typing
- **Prisma ORM** – for database access
- **SQLite** – simple embedded database (for quick local dev)
- **dotenv** – environment configuration

---

## 📁 Project Structure

```
express-ts-crud/
├── prisma/
│   └── schema.prisma        # Database schema
├── src/
│   ├── controllers/         # CRUD logic
│   ├── routes/              # Express routes
│   ├── app.ts               # Express app setup
│   └── server.ts            # Entry point
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧑‍💻 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Run the development server

```bash
npm run dev
```

Server will start on [http://localhost:3000](http://localhost:3000)

---

## 🧪 Example API Endpoints

### ➕ Create a resource

`POST /resources`

```json
{
  "name": "My First Resource",
  "type": "demo"
}
```

---

### 📄 List resources (with optional filter)

`GET /resources?name=search`

---

### 🔍 Get resource by ID

`GET /resources/:id`

---

### ✏️ Update a resource

`PUT /resources/:id`

```json
{
  "name": "Updated Resource",
  "type": "production"
}
```

---

### ❌ Delete a resource

`DELETE /resources/:id`

---

## 📝 Environment Variables

Create a `.env` file (if needed), for example:

```env
PORT=3000
```

---

## 📩 Postman Collection

You can import the postman_collection.json file into Postman to test all endpoints quickly.

---

## 📚 Scripts

| Script         | Description                |
|----------------|----------------------------|
| `npm run dev`  | Run server in dev mode     |
| `npm run build`| Compile TypeScript         |
| `npm start`    | Start built server (prod)  |

---

## 🧠 Notes

- This project uses SQLite for simplicity — you can change to PostgreSQL/MySQL in `prisma/schema.prisma` easily.
- Prisma auto-generates a typed client — no need to write raw SQL!
- Type-safe, fast, and great for beginners or small services.

---

## ✨ Author

Built with 💻 and ☕ by **Hucci (Chính Nguyễn)**
> Contact me on [LinkedIn](https://www.linkedin.com/in/chinhnguyen-dev) or [GitHub](https://github.com/chinhnguyen-95)