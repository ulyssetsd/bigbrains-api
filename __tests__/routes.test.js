const supertest = require('supertest');
const http = require('http');
const app = require('../app.js');

let server;
let request;
let user;

beforeAll(done => {
	server = http.createServer(app);
	server.listen(done);
	request = supertest(server);
});

afterAll(done => {
	server.close(done);
});

describe('/ (root)', () => {
	it('GET\t/', (done) => {
		request
			.get('/')
			.expect(404, done);
	});
	
	it('POST\t/register', () => {
		return request
			.post('/register')
			.send({
				name: 'test',
				email: 'test@gmail.com',
				password: 'password',
			})
			.expect(200)
			.then(response => user = response.body)
	});
	
	it('POST\t/register user already exist', (done) => {
		request
			.post('/register')
			.send({
				name: 'test',
				email: 'test@gmail.com',
				password: 'password',
			})
			.expect(400, '"email already used"', done);
	});
	
	it('POST\t/signin', (done) => {
		request
			.post('/signin')
			.send({
				email: 'test@gmail.com',
				password: 'password',
			})
			.expect(200, done);
	});
	
	it('POST\t/signin wrong password', (done) => {
		request
			.post('/signin')
			.send({
				email: 'test@gmail.com',
				password: 'wrongpassword',
			})
			.expect(401, '"email and password combination is incorrect"', done);
	});
	
	it('POST\t/signin wrong email', (done) => {
		request
			.post('/signin')
			.send({
				email: 'wrongemail',
				password: 'password',
			})
			.expect(401, '"email and password combination is incorrect"', done);
	});
})

describe('/users', () => {
	it('GET\t/', (done) => {
		request
			.get('/users/')
			.expect(200, done);
	});

	it('GET\t/:id', (done) => {
		request
			.get(`/users/${user.id}`)
			.expect(200, {
				id: user.id,
				name: 'test',
				email: 'test@gmail.com',
				entries: 0,
				joined: user.joined
			}, done);
	});

	it('GET\t/:id wrong id', (done) => {
		request
			.get('/users/99999999')
			.expect(400, '"user not found"', done);
	});

	it('PUT\t/entries', (done) => {
		request
			.put('/users/entries')
			.send({
				id: user.id,
				entries: 2,
			})
			.expect(200, '2', done);
	});
	
	it('PUT\t/entries wrong id', (done) => {
		request
			.put('/users/entries')
			.send({
				id: -1,
				entries: 1,
			})
			.expect(400, '"user not found"', done);
	});

	it('DELETE\t/:id', (done) => {
		request
			.delete(`/users/${user.id}`)
			.expect(200, done);
	});
})