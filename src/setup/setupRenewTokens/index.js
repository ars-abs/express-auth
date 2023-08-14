import saveLogin from '../../saveLogin';
import renewTokens from './renewTokens';

const setupRenewTokens = ({ app }) => app.get(
	'/renewTokens', renewTokens, saveLogin, (req, res) => res.redirect('/')
);

export default setupRenewTokens;
