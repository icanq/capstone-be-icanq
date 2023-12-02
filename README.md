# Simple app for my capstone project using Expres.JS & Prisma

# Langkah langkah pengerjaan project ini

1. inisiasi project npm dengan menggunakan command `npm init -y`
2. update `package.json` dengan menambahkan scripts seperti

```json

"scripts": {
		"start": "node index.js",
		"start:dev": "nodemon index.js"
	},

```

3. install package yang diperlukan

```bash
npm install express mysql2 dotenv cors
```

4. install devDependency karena pake nodemon

```bash
npm install -D nodemon
```

5. lalu akan ada `node_modules` dan `package-lock.json` yang dibuat secara otomatis oleh `npm` dimana jangan diubah isinya oleh kita sendiri dan jangan pula untuk di push ke `github!` soalnya nanti bakal nyusahin orang lain

6. biar `node_modules` dan `.env` tidak ke push ke `github` kita akan bikin satu file namanya `.gitignore` biar `node_modules` dan `.env` tidak ikut ke upload ke git

7. kalau males bisa lewat git bash atau terminal pake command ini

```bash
echo node_modules >> .gitignore
```

8. inisiasi project dengan membuat satu file entrypoint, disini gw pakenya `index.js` kalian bebas namainnya mau `app.js` atau `server.js` gapapa, yang penting jangan namainnya gajelas gitu. kalau udah bikin file tadi, bisa update `package.json` dimana script untuk memulai aplikasi backend harus ke entrypoint file yang kalian tentukan tadi, contoh kalo gw pake entrypointnya `index.js` berarti di script jadinya

```json
"scripts": {
  "start": "node index.js",
  "start:dev": "nodemon index.js"
}
```

9. import express, dotenv, dan package lain yang awal kita install tadi, bikinlah satu rute untuk mencoba apakah aplikasi kalian bisa jalan atau tidak

contohnya:

```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	res.send("here is the response");
});

app.all("*", async (req, res) => {
	res.json({
		message: "Routes you're looking is not found",
	});
});

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server is already running at ${PORT}`);
});
```

10. lanjut dalam integrasi project ini dengan prisma agar kita bisa terhubung dengan database dan melakukan pengambilan/masukin data ke database dengan [prisma](https://prisma.io)
