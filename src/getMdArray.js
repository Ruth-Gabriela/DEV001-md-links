
const path =require("path");
const fs = require("fs");

// La ruta es un directorio? -> True || False
const pathIsDirectory = (pathName) => fs.statSync(pathName).isDirectory();
const readDirectory = (pathName) => fs.readdirSync(pathName, "utf-8");
const validateExtName = (pathName) => path.extname(pathName); // => txt, md, png

// obtener un array con archivos md.
const getMdArray = (absolutePath) => {
  //c:/documents
  let mdArray = [];
  if(pathIsDirectory(absolutePath)) {
    // console.log(readDirectory(absolutePath));
    readDirectory(absolutePath).forEach((item) => {
      let itemPath = path.join(absolutePath, item); //c://documents/files
      mdArray = [...mdArray, ...getMdArray(itemPath)]; // Aplica recursividad
    });
  }else{
    const ext = validateExtName(absolutePath);
    if(ext === ".md"){
      mdArray.push(absolutePath);
    }
  }
  return mdArray;
};

module.exports = {
    getMdArray,
    pathIsDirectory,
    readDirectory,
    validateExtName,
};