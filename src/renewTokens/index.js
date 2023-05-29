import refreshTokens from './refreshTokens';

const renewTokens = async (req, res, next) => {
	!req.cookies.token && res.redirect('/login');
	req.user = await refreshTokens(req);
	next();
};

export default renewTokens;
