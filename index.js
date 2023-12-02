require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { prisma } = require("./config/prisma");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	res.send("here is the response");
});

// catalog routes

// get all catalog
app.get("/catalogs", async (req, res) => {
	const catalog = await prisma.catalog.findMany();
	res.status(200).send(catalog);
});

// get catalog by id
app.get("/catalogs/:id", async (req, res) => {
	const catalog = await prisma.catalog.findUnique({
		where: {
			id: parseInt(req.params.id),
		},
	});
	if (!catalog)
		res.status(404).json({
			message: "Catalog not found",
		});
	else res.status(200).json(catalog);
});

// create catalog
app.post("/catalogs", async (req, res) => {
	const { name } = req.body;
	// todo - handle if name is not passed in
	// if (!name) res.status(400).json({ message: "Name is required" });
	const newCatalog = await prisma.catalog.create({
		data: {
			name: name,
		},
	});
	res.status(201).json({
		message: "Catalog created",
		data: newCatalog,
	});
});

// update catalog
app.put("/catalogs/:id", async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const updatedCatalog = await prisma.catalog.update({
		where: { id: parseInt(id) },
		data: { name: name },
	});
	res.status(200).json({
		message: `catalog with id: ${id} is updated`,
		data: updatedCatalog,
	});
});

// delete catalog
app.delete("/catalogs/:id", async (req, res) => {
	const { id } = req.params;
	await prisma.catalog.delete({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json({
		message: `product with id: ${id} successfully deleted`,
	});
});

app.all("*", async (req, res) => {
	res.json({
		message: "Routes you're looking is not found",
	});
});

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server is already running at ${PORT}`);
});
