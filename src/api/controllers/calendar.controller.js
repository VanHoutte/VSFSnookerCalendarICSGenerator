export function generateICS(req, res) {
	var access_code = req.body.access_code;
	OAuthService.fetchAccessToken(access_code)
		.then(onSuccess)
		.catch((err) => formatError(err));

	function onSuccess(response) {
		return res.status(200).send(OAuthMapper.toClientFormatSingle(response));
	}

	function formatError(error) {
		if (error.statusCode == 400 && error.error && error.error.error_description) {
			return ErrorService.globalErrorHandler(res, new ValidationError(error.error.error_description));
		}

		return ErrorService.globalErrorHandler(res, error);
	}
}
