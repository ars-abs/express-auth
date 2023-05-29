const includeContextToReq = (context) => (
	req, res, next
) => {
	req.context = context;
	next();
};

export default includeContextToReq;
