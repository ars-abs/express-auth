const repoStandards = {
	object: ({ repo }) => repo,
	string: ({ repo, repos }) => repos[repo],
};

export default repoStandards;
