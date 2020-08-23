import xhr from 'utils/xhr';

const prefix = '/';

export const getUserName = async () => {
    let response = await xhr.get (prefix + 'getUserName');
    return response;
};

export const redirectLanding = async () => {
	let response = await xhr.get (prefix + 'logout');
	return response;
};


