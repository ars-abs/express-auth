import jwt from 'jsonwebtoken';
import fetchTokens from './fetchTokens';

const refreshTokens = async (req, res) => {
	const { sub, iss } = jwt.decode(req.cookies.token);
	const {
		tokenURL, clientID, clientSecret,
	} = req.context.config.auth.providers[iss];
	const user = (await req.context.config.auth.userSchema
		.findAll({ where: { user: sub, iss: iss }}))[0];

	return user
		// eslint-disable-next-line object-shorthand
		? fetchTokens({
			refreshToken: user.refreshToken, tokenURL, clientID, clientSecret,
		})
		: res.redirect('/login');
};

export default refreshTokens;
