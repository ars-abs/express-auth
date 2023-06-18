import logout from './logout';

const setupLogout = ({ app, config: { auth: { logoutURL }}}) =>
	app.get(`${ logoutURL }`, logout);

export default setupLogout;
