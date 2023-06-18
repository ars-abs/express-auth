import { DataTypes } from 'sequelize';

const buildUserSchema = ({ repos, config: { auth: { repo }}}) => {
	const db = repos[repo];
	const User = db.define('user', {
		user: DataTypes.STRING,
		iss: DataTypes.STRING,
		refreshToken: DataTypes.TEXT,
		accessToken: DataTypes.TEXT,
	});

	User.sync({ alter: true });

	return User;
};

export default buildUserSchema;
