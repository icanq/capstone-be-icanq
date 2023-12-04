const express = require("express");
const productRoutes = express.Router();
const { prisma } = require("../config/prisma");

productRoutes.get("/", async (req, res) => {
	const { soldout } = req.query;
	const products = await prisma.product.findMany({
		where: {
			isSoldOut: soldout === "true" ? true : false,
		},
		include: {
			Catalog: true,
		},
	});
	res.status(200).send(products);
});

productRoutes.post("/", async (req, res) => {
	// const { name, price, imageUrl, catalogId } = req.body
	const newProduct = await prisma.product.create({
		data: {
			name: req.body.name,
			price: parseInt(req.body.price),
			imageUrl: req.body.imageUrl,
			catalogId: parseInt(req.body.catalogId),
		},
	});
	res.status(201).json({
		message: "Product created",
		data: newProduct,
	});
});

// get product by catalogId
productRoutes.get("/:catalogId", async (req, res) => {
	const { catalogId } = req.params;
	const products = await prisma.product.findMany({
		where: {
			catalogId: parseInt(catalogId),
		},
	});
	res.status(200).send(products);
});

module.exports = { productRoutes };
