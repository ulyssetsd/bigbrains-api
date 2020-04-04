const database = require('../database');

const usersService = {
	getAll: async () => await database('users'),

	getById: async (id) => {
		const user = await database('users').where({id}).first();

		if (!user)
			throw new Error('user not found');

		return user;
	},

	deleteById: async (id) => await database('users').where({id}).del(),

	addEntries: async (id , entries) => {
		const user = await database('users').where({id}).first();

		if (!user)
			throw new Error('user not found');

		const [updatedUser] = await database('users').where({id})
			.returning('*')
			.increment({entries: entries})
		
		return updatedUser;
	}
}

module.exports = usersService;