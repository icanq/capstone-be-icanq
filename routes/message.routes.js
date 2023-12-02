const express = require("express");
const messageRoutes = express.Router();
const { prisma } = require("../config/prisma");

// get all message
messageRoutes.get("/", async (req, res) => {
	const messages = await prisma.contactus.findMany();
	res.status(200).send(messages);
});

// create new message
messageRoutes.post("/", async (req, res) => {
	const { name, email, message } = req.body;
	const newMessage = await prisma.contactus.create({
		data: {
			name: name,
			email: email,
			message: message,
		},
	});
	res.status(201).json({
		message: "Message created",
		data: newMessage,
	});
});

module.exports = { messageRoutes };
