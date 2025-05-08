// .js => por defecto utiliza el commonjs
// .mjs => por defecto utiliza ES modules
// .cjs => por defecto utiliza commonjs

const os = require("node:os")

console.log("informacion del sistema operativo")
console.log("-------------------------------------")

console.log("Sistema operativo: ", os.platform())
console.log("Version del sistema operativo: ", os.release())
console.log("Arquitectura del sistema operativo: ", os.arch())
console.log("Nombre del host: ", os.hostname())
console.log("Directorio de inicio: ", os.homedir())
console.log("Memoria total: ", os.totalmem())
console.log("Memoria libre: ", os.freemem())
console.log("Numero de CPU: ", os.cpus())
console.log("Carga del sistema: ", os.loadavg())
console.log("Directorio temporal: ", os.tmpdir())
console.log("Redes: ", os.networkInterfaces())
console.log("Sistema de archivos: ", os.type())

