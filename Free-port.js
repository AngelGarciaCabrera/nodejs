const net = require("node:net"); //protpoocolo mas rapido que el http

function findFreePortAvilable(port) {
    return new Promise((resolve,rejects)=>{
        //utilizo una promesa para validar si el puerto esta libre

        const server = net.createServer();
                            // si uso el local host se puede quedar en blanco, sino poner la ip espesifica '127.0.0.1
        server.listen(port,"127.0.0.1",() => {
            const {port} = server.address(); //tomo el puerto del server
            server.close(() => {
                resolve(port);
            });
        });
        
        server.on("error",(error)=>{
            if(error.code === "EADDRINUSE"){ // EADDRINUSE este es el tipo de error que me tira el servidor si el puerto esta ocupado
                findFreePortAvilable(0).then(port=> resolve(port))
            }else{
                rejects(error);
            } 
        })
    })
  
};

module.exports = findFreePortAvilable;


