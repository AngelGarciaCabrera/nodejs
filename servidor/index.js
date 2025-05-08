const http = require('node:http');
// instancio el http para poder  crear un servidor
const findFreePortAvilable = require('../Free-port'); // importo la funcion que busca el puerto libre

const startServer = async () => { 
    const originalPort = 5064; // puerto que quiero usar

    const processRequest = (req, res) => {
        if( req.url === "/"){
            console.log("REQUEST RECIBIDO", req.url);
            res.setHeader("Content-type","text/plain; charset=utf-8"); // seteo el tipo de contenido
            res.end("Hola Bienvendio al 1servidor");
        }
    }

    const server = http.createServer(processRequest); // paso la funcion que procesa la request

    try {
        const freePort = await findFreePortAvilable(originalPort); // busco el puerto libre
        // el puerto libre puede ser el original o uno alternativo

        server.listen(freePort,"127.0.0.1",() => {
            const actualPort = server.address().port;
            const info = actualPort === originalPort // si es igual le dejo saber que el puerto original esta libre
                ? `Servidor escuchando en el puerto solicitado: http://127.0.0.1:${actualPort}`
                : `Puerto ${originalPort} ocupado. Servidor escuchando en el puerto alternativo: http://127.0.0.1:${actualPort}`;
            console.log(info);
        });

    } catch (err) {
        console.log("Error al iniciar servidor:", err);
    }
};

startServer();
