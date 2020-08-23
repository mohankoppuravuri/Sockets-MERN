const axios    = require ('axios');
const hostname = require ('./utility.js');

const xhr = {};

xhr.CancelToken = axios.CancelToken;

const defaultOptions = {
	timeout      : 60000,
	header       : { 'Content-Type' : 'application/json' },
	responseType : 'json',
	baseURL      : `https://${hostname.getHostname()}`
};

const _axios = axios.create (defaultOptions);

let filter_error = (error) => {
	if (error.response)
		return error.response.data;

	if (error.request)
		return error.request;

	return error.message;
}

xhr.get = function (url, options) {

	options = options || {};

	return new Promise (async (resolve, reject) => {

		try {
			let _config = {
				url    : url,
				method : 'get',
				...options
			};

			let response = await _axios.request (_config);
			resolve (response.data);
		}
		catch (err) {
			let error = filter_error (err);
			reject (error);
		}

	});
};
xhr.post = function (url, postData, options) {
	options = options || {};
	return new Promise (async (resolve, reject) => {

		try {
			let _config = {
				url              : url,
				method           : 'post',
				data             : postData,
				...options
			};
		
			let response = await _axios.request (_config);
			resolve (response.data);
		}
		catch (err) {
			let error = filter_error (err);
			reject (error);
		}

	});
};
export default xhr;
