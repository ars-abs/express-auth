import { DataTypes } from 'sequelize';

const getUserSchema = ({ repos, config: { auth: { repo }}}) => {
	const db = repos[repo];
	const User = db.define('user', {
		user: DataTypes.STRING,
		iss: DataTypes.STRING,
		refreshToken: DataTypes.STRING,
		accessToken: DataTypes.STRING,
	});

	User.sync({ alter: true });

	return User;
};

export default getUserSchema;
