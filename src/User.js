import { Sequelize, DataTypes } from 'sequelize';

const db = new Sequelize({
	dialect: 'sqlite',
	storage: './db.sqlite',
	logging: false,
});

const User = db.define('user', {
	user: DataTypes.STRING,
	refreshToken: DataTypes.STRING,
	accessToken: DataTypes.STRING,
});

User.sync();

export default User;
