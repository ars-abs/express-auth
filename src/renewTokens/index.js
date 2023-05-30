import refreshTokens from './refreshTokens';

const renewTokens = async (req, res, next) => {
	const refreshing = async (request, response) => {
		request.user = await refreshTokens(request, response);
		request.user && next();
	};

	!req.cookies.token
		? res.redirect('/login')
		: await refreshing(req, res);
};

export default renewTokens;
