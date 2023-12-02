const express = require("express");
const catalogRoutes = express.Router();
const { prisma } = require("../config/prisma");

// get all catalog
catalogRoutes.get("/", async (req, res) => {
	const catalog = await prisma.catalog.findMany();
	res.status(200).send(catalog);
});

// get catalog by id
catalogRoutes.get("/:id", async (req, res) => {
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
catalogRoutes.post("/", async (req, res) => {
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
catalogRoutes.put("/:id", async (req, res) => {
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
catalogRoutes.delete("/:id", async (req, res) => {
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

module.exports = { catalogRoutes };
