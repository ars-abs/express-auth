import jwt from 'jsonwebtoken';
import fetchTokens from './fetchTokens';

const refreshTokens = async ({
	cookies: { token },
	context: { config: { auth: { providers, userSchema, loginURL }}},
}, res) => {
	const { sub, iss } = jwt.decode(token);
	const { tokenURL, clientID, clientSecret } = providers[iss];
	const user = (await userSchema
		.findAll({ where: { user: sub, iss: iss }}))[0];

	return user
		// eslint-disable-next-line object-shorthand
		? fetchTokens({
			refreshToken: user.refreshToken, tokenURL, clientID, clientSecret,
		})
		: res.redirect(loginURL);
};

export default refreshTokens;
