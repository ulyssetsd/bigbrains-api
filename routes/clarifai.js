const express = require('express');
const clarifaiService = require('../services/clarifai');
const router = express.Router();

// POST clarifai img
router.post('/', (req, res) => {
	const { url } = req.body;
	clarifaiService.detectFace(url)
		.then(faces => res.json(faces))
		.catch(err => res.status(400).json(err.message))
})

module.exports = router;
