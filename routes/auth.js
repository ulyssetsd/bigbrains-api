const express = require('express');
const authService = require('../services/auth');
const router = express.Router();

router.post('/signin', (req, res) => {
	const { email, password } = req.body;
	authService.login(email, password)
		.then(user => res.json(user))
		.catch(() => res.status(401).json('email and password combination is incorrect'))
})

router.post('/register', (req, res) => {
	const { email, password, name } = req.body;
	if(email === '' || password === '' || name === '')
		return res.status(400).json('Inputs missings');
	authService.register(email, password, name)
		.then(user => res.json(user))
		.catch(() => res.status(400).json('email already used'))
})

module.exports = router;
