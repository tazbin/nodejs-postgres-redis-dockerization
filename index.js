const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const redis = require('redis');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

const postgresHost = process.env.POSTGRES_HOST;
const postgresPort = process.env.POSTGRES_PORT; 
const postgresPassword = process.env.POSTGRES_PASSWORD; 
const postgresUsername = process.env.POSTGRES_USERNAME;
const postgresDatabaseName = process.env.POSTGRES_DATABASE_NAME;

const sequelize = new Sequelize(`postgres://${postgresUsername}:${postgresPassword}@${postgresHost}:${postgresPort}/${postgresDatabaseName}`);

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT; 

const client = redis.createClient({ url: `redis://${redisHost}:${redisPort}` });

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

(async () => {
    try {
        await client.connect();
        console.log('Redis Connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the redis:', error);
    }
})();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const User = sequelize.define('user', {
    name: DataTypes.TEXT,
    age: DataTypes.INTEGER
});

app.get('/users', async (req, res) => {
    let user = await client.get('user-list');
    if( !user ) {
        user = await User.findAll();
        user = JSON.stringify(user);
        await client.set('user-list', user, { EX: 10 });
    }
    res.send(JSON.parse(user));
})

app.post('/users', async (req, res) => {
    const newUser = req.body;
    const savedUser = await User.create(newUser);
    res.send(savedUser);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
