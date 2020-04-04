const database = require('../database');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const authService = {

	login: async (email, password) => {
		const [user] = await database('users').where({email});
		const [login] = user ? await database('login').where({users_id: user.id }) : [];

		if(!user || !login) 
			throw new Error(`user with email:${email} doesn't exist`);

		if(!await bcrypt.compare(password, login.hash))
			throw new Error('wrong password');

		return user;
	},
	
	register: (email, password, name) => 
		database.transaction(trx => 
			trx('users').insert({
				name: name,
				email: email,
				joined: new Date(),
			}).returning('*').then(users => 
				bcrypt.hash(password, saltRounds).then(hash => 
					trx('login').insert({
						hash: hash,
						users_id: users[0].id,
					}).then(() => users[0])
				)
			).then(trx.commit).catch(trx.rollback)
		)	
	,
}

module.exports = authService;