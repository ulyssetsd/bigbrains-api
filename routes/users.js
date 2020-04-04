const express = require('express');
const usersService = require('../services/users');
const router = express.Router();

// GET users listing
router.get('/', (req, res) => {
	usersService.getAll()
		.then(users => res.json(users))
		.catch(err => res.status(400).json(err.message))
})

// GET user by id
router.get('/:id', (req, res) => {
	const { id } = req.params;
	usersService.getById(id)
		.then(user => res.json(user))
		.catch(err => res.status(400).json(err.message))
})

// DELETE user by id
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	usersService.deleteById(id)
		.then(response => res.json(response))
		.catch(err => res.status(400).json(err.message))
})

// PUT add entries to user
router.put('/entries', (req, res) => {
	const { id , entries } = req.body;
	usersService.addEntries(id, entries)
		.then(user => res.json(user.entries))
		.catch(err => res.status(400).json(err.message))
})

module.exports = router;
