import fs from "node:fs/promises" // fs => file system


Promise.all([
    fs.readFile("./archivo.txt", "utf-8"),
    fs.readFile("./archivo2.txt", "utf-8")
    
]).then(([read, read2]) => {
    console.log("Leyenedo el primer archivo")
    console.log(read)
   
    console.log("---------------------------")
    console.log("Leyenedo el segundo archivo")
    console.log(read2)
}).catch(err => {
    console.error(err)
})



function obtenerUsuario(id) {
    if (id === 0) {
      // valor ya conocido
      return Promise.resolve({ nombre: "Admin", id: 0 });
    }
  
    // simulación de fetch
    return fetch(`/api/usuarios/${id}`).then(res => res.json());
  }
  
  obtenerUsuario(0).then(usuario => {
    console.log(usuario); // { nombre: "Admin", id: 0 }
  });

/*
Promise.all([
    await axios.get("https://jsonplaceholder.typicode.com/posts"),
    await axios.get("https://jsonplaceholder.typicode.com/posts/1")
]).then(([[users,centros]])=>{
    setUsers(users.data)
    setCentros(centros.data)
}).catch(e=>{
    console.error(e)
})
    */