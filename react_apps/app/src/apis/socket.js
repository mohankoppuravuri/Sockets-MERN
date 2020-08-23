import openSocket from 'socket.io-client';
const  socket = openSocket(`https://` + window.location.hostname);

export { socket };
