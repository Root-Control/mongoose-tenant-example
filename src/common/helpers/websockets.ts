let socket: any = null;

const setSocketServer = (server: any) => {
	console.log('SETTING SOCKET SERVER');
	socket = server;
};

const getSocketServer = () => {
	console.log('GETTING SOCKET SERVER');
	return socket;
};

export {
    setSocketServer,
    getSocketServer
};