// .js => por defecto utiliza el commonjs
// .mjs => por defecto utiliza ES modules
// .cjs => por defecto utiliza commonjs

const { fs } = require("node:fs/promises")


(
  //ife
  async () => {
    console.log("Leyenedo el primer archivo");
    const read = await fs.readFile("./archivo.txt", "utf-8");
    console.log(read);

    console.log("cosas mientras leemos el archivo");

    console.log("---------------------------");

    console.log("Leyenedo el segundo archivo");
    const read2 = await fs.readFile("./archivo2.txt", "utf-8");
    console.log(read2);

    console.log("---------------------------");
  }
)();



(async()=>{
    await axios.ger("")
})()