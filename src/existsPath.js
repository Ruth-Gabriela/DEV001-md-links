const fs = require("fs");

// @existsSync: Verifica si la ruta existe, retorna true o false.
const existsPath = (absolutePath) => {
  const path = fs.existsSync(absolutePath);
  if(path){
    return true;
  }else{
    throw new Error("La ruta no existe");
  }
};

module.exports = existsPath;