import { DataTypes } from 'sequelize';
import repoTypes from './repoTypes';

const getUserSchema = ({ config: { auth: { repo }}}) => {
	const db = repoTypes[repo.type](repo);

	const User = db.define('user', {
		user: DataTypes.STRING,
		iss: DataTypes.STRING,
		refreshToken: DataTypes.STRING,
		accessToken: DataTypes.STRING,
	});

	User.sync();

	return User;
};

export default getUserSchema;
