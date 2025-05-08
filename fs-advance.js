const fs = require("node:fs/promises");
const path = require("node:path");
const pitocolor = require("picocolors");

const folder = process.argv[2] || ".";

async function ls(folder) {
  let files;

  try {
    files = await fs.readdir1(folder);
  } catch (error) {
    console.log(pitocolor.red("Error al leer el directorio", error));
    process.exit(1); //1 de error
  }

  const filePromisses = files.map(async (file) => {
    const filePath = path.join(folder, file);
    try {
      const stats = await fs.stat(filePath);
      return {
        name: file,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        size: stats.size,
        fileModified: stats.mtime.toLocaleTimeString(),
      };
    } catch (error) {
      console.log("Error al obtener la información del archivo", error);
    }
  });
  const fileInfos = await Promise.all(filePromisses);
  console.log(fileInfos);
}

ls(folder);
