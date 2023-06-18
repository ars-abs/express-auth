import refreshTokens from './refreshTokens';

const renewTokens = async (req, res, next) => {
	const {
		cookies: { token },
		context: { config: { auth: { loginURL }}},
	} = req;
	const refreshing = async (request, response) => {
		request.user = await refreshTokens(request, response);
		request.user && next();
	};

	!token
		? res.redirect(loginURL)
		: await refreshing(req, res);
};

export default renewTokens;
