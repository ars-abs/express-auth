import jwt from 'jsonwebtoken';
import User from './User';

const saveTokens = async ({ idToken, refreshToken, accessToken }) => {
	const { sub } = jwt.decode(idToken);

	await User.create({
		user: sub,
		refreshToken: refreshToken,
		accessToken: accessToken,
	});
};

export default saveTokens;
