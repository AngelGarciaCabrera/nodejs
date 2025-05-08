

// .js => por defecto utiliza el commonjs
// .mjs => por defecto utiliza ES modules
// .cjs => por defecto utiliza commonjs

const fs = require("node:fs/promises") // fs => file system
const { promisify } = require("node:util")
/*
solo en los modulos nativos que no tienen promesa 
const {promisify} = require("node:util")
const readFile = promisify(fs.readFile) */


console.log("Leyenedo el primer archivo")
fs.readFile("./archivo.txt", "utf-8")
.then(text=>{
    console.log(text)
})

console.log("cosas mientras leemos el archivo")

console.log("---------------------------")

console.log("Leyenedo el segundo archivo")
fs.readFile("./archivo2.txt", "utf-8").then(text=>{
    console.log(text)
})

console.log("---------------------------")


   
