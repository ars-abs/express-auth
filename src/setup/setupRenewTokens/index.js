import renewTokens from './renewTokens';
import saveLogin from '@saveLogin';

const setupRenewTokens = ({ app }) => app.get(
	'/renewTokens', renewTokens, saveLogin, (req, res) => res.redirect('/')
);

export default setupRenewTokens;
