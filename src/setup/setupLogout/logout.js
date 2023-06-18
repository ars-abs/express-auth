const logout = ({ context: { config: { auth: { loginURL }}}}, res) => {
	res.clearCookie('token');
	res.redirect(loginURL);
};

export default logout;
