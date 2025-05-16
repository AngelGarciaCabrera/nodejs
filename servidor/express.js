
import express from 'express';
import findFreePortAvailable from "../Free-port.js"
import fs from "node:fs/promises";

const app = express();

//const PORT = process.env.PORT || 3000;

// esto sirve como un middleware para asegurarse que devuelv aun json
app.use(express.json());
 // Middleware para parsear el cuerpo de las solicitudes JSON

 app.disable('x-powered-by'); // Deshabilitar el encabezado x-powered-by para mayor seguridad

 //endpoint the gets
const dittoJSON = JSON.parse( await fs.readFile(new URL("./data/ditto.json", import.meta.url)));



//middleware para logear 

app.use((req,res,next)=>{
    // verificar la peticion
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);

    if(req.method !== "POST") return next();
    if(req.headers["content-type"] !== "application/json") return next();


    next();
})


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get("/pokemon/ditto", ( req,res)=>{
    res.setHeader("Content-type","application/json; charset=utf-8");
    return res.end(JSON.stringify(dittoJSON));
})
//post endpoint
app.post("/pokemon", (req, res) => {
    const data = req.body;
    data.timestamp = new Date().toISOString();
    res.json(data);
});

// esto tiene que estar al final porque tiene que ser la ultima opcion
// app.use significa que no importa el metodo va a entrar 
app.use((req, res) => {
    res.status(404).send('404 Not Found');
})


 // verifico si el puerto esta libre
const PortVerify = await findFreePortAvailable(5064);
app.listen(PortVerify,"127.0.0.1", () => {
    console.log(`Server is running on http://127.0.0.1:${PortVerify}`);
})