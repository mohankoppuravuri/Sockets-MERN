export const login = async (username,password) => {

	let hostname = window.location.hostname;

	try {
		let response = await fetch(`https://${hostname}/auth`, {
			method  : 'POST',
			headers : { 'Content-Type' : 'application/json'},
			body: JSON.stringify ({
				"username": username,
				"password": password
			})
		});

		const data = await response.json();

		if (data.authenticated)
			window.location.replace(`https://${hostname}/app`);
		else
			return {data : 'wrong credentials', success : true};

	} catch (error) {
		return {data : error, success : false};
	}
}
