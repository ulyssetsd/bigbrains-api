CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email TEXT UNIQUE NOT NULL,
    entries INTEGER DEFAULT 0,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    users_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);