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

11. inisiasi project npm yang ingin diintegrasikan dengan prisma, kita harus install dulu si prismanya

```bash
npm install -D prisma
```

12. inisasi prisma

```bash
prisma init
```

by default prisma akan menginisiasi project dengan database postgresql, kalau kalian ingin memakai databasenya mysql kalian bisa pakai command

```bash
npx prisma init --datasource-provider mysql
```

notes: bacaan lanjutan bisa kalian baca [disini](https://www.prisma.io/docs/concepts/database-connectors/mysql)

13. lalu akan kode tambahan pada file `.env` yaitu `DATABASE_URL` dimana nanti kalian harus isi sesuai dengan `DATABASE_URL` kalian, bisa diisi pake `DATABASE_URL` dari `railway` atau kalau jalanin di local, pake yang localhost dulu aja `"mysql://root:password@localhost:3306/capstone_icanq"`. Dan ada satu file khusus yang ke generate dalam sebuah folder namanya `prisma` nama filenya `schema.prisma` dimana kalian harus mendefinisikan model kalian disitu sesuai dengan perencanaan yang kalian sudah rencanakan

14. kalau mau file schema.prisma berwarna atau dikasih highlight pada syntaxnya kalian bisa download extension [ini](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

15. kita bisa buat `schema` database dari yang udah kita rencanain dalam file `schema.prisma` dimana ada syntaxnya sendiri kalian bisa baca dokumentasinya di link [ini]

ini ada contoh dari model dari schema yang dibikin

```
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Int
  imageUrl  String? // arti ?, not required, kalau pengen dibikin gapapa deh kalau datanya kosong
  catalogId Int?
  createdAt DateTime @default(now())
  // untuk menambahkan relasi dari Product ke Catalog dimana Product boleh gapunya catalog
  Catalog   Catalog? @relation(fields: [catalogId], references: [id])
}

model Catalog {
  id       Int       @id @default(autoincrement())
  name     String
  // untuk nambahin relasi antara catalog dengan Product
  products Product[] // ini artinya Catalog punya banyak product
}

model Message {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String   @db.Text // biar bisa nyimpen pesan dengan karakter yang panjang
  createdAt DateTime @default(now())
}

```

16. setelah kita define model di `schema.prisma` kita bisa melakukan synchronization database kita dengan schema yang udah dibuat tadi dengan command

```bash
npx prisma migrate dev --name <nama_apa_yang_kalian_lakukan>

```

<nama_apa_yang_kalian_lakukan> bisa diganti dengan aktifitas apa sih yang kamu lakaukan barusan, contoh:

1. inisialisasi
2. add_new_model_User
3. add_relation_to_catalog_and_product

`npx prisma migrate dev` wajib dilakukan setiap kali kalian sudah selesai mengubah schema.prisma atau adanya perubahan pada schema kalian, agar database selalu tersingkronisasi
