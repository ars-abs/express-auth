import jwt from 'jsonwebtoken';
import fetchTokens from './fetchTokens';

const refreshTokens = async (req) => {
	const { sub, iss } = jwt.decode(req.cookies.token);
	const {
		tokenURL, clientID, clientSecret,
	} = req.context.config.auth.providers[iss];
	const [{ refreshToken }] = await req.context.config.auth.userSchema
		.findAll({ where: { user: sub, iss: iss }});

	return fetchTokens({ refreshToken, tokenURL, clientID, clientSecret });
};

export default refreshTokens;
