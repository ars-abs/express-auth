import refreshTokens from './refreshTokens';

const renewTokens = async (req, res, next) => {
	const refreshing = async (request) => {
		request.user = await refreshTokens(request);
		next();
	};

	!req.cookies.token
		? res.redirect('/login')
		: await refreshing(req);
};

export default renewTokens;
