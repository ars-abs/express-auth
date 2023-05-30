import repoStandards from './repoStandards';

const normalizeRepo = ({ config: { repos, auth: { repo }}}) =>
	repoStandards[typeof repo]({ repo, repos });

export default normalizeRepo;
