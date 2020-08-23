export function getHostname () {
	let hostname;

	if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_BASEURL) {
		hostname = process.env.REACT_APP_BASEURL;
		return hostname;
	}

	hostname = `${window.location.hostname}`;
	return hostname;
}

export function redirectTo (route) {
	let hostname = getHostname ();
	window.location.replace(`https://` + hostname + route);
}
