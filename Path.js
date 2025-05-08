const path = require("node:path")

// esto te dice las barras separadoras de tu so
console.log(path.sep)

// unir rutas sin inportar el os
const filePath = path.join("carpeta", "subcarpeta", "archivo.txt")
console.log(filePath)

// optener el nombre del archivo

const basename = path.basename("/test/archivos/pasword.txt")
console.log(basename)

// optener el nombre del archivo sin la extension
const filename = path.basename("/test/archivos/pasword.txt", ".text")
console.log(filename)

// optener la extension del archivo
const extname = path.extname("/test/archivos/pasword.txt")
console.log(extname)