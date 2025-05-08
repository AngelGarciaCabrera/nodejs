import http from "node:http";
import findFreePortAvailable from "../Free-port.js"

import fs from "node:fs/promises";

const dittoJSON = JSON.parse( await fs.readFile(new URL("./data/ditto.json", import.meta.url)));


const ProcessRequest = (req, res) => {
     // espero el metodo y la url a el que fue dirigido
   const { method, url } = req; 

   switch(method){
    case "GET":
        switch(url){
            case "/pokemon/ditto":
                res.setHeader("Content-type","application/json; charset=utf-8");
                return res.end(JSON.stringify(dittoJSON));
            default:
                res.writeHead(404,{"Content-type":"text/plain; charset=utf-8"});
                return res.end("404 Not Found");
        }
    
    case "POST":
        switch(url){
            case "/pokemon":{
                
               let  body = "";
                req.on("data",part=>{
                    body += part.toString();
                })
                //esperamos el final de la peticion usando el evento end

                req.on("end",()=>{
                    const data = JSON.parse(body);

                    //aqui se podria llamar a la base da datos para guardar el nuevo pokemon
                    res.writeHead(201,{"Content-type":"application/json; charset=utf-8"});
                    data.timestamp = new Date().toISOString();
                    res.end(JSON.stringify(data));
                })
               
                break;
            }
            default:
                res.writeHead(404,{"Content-type":"text/plain; charset=utf-8"});
                return res.end("404 Not Found");
              
        }
   } 
};

const server = http.createServer(ProcessRequest);

const GetPort = await findFreePortAvailable(5064);

server.listen(GetPort,"127.0.0.1", () => {
    console.log(`Server listening on port http://127.0.0.1:${GetPort}`);
});