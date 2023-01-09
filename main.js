const {
    validatePath,
    existsPath,
    readFileMd,
    getLinksMd,
    getHttpStatus,
    getMdArray,
  } = require("./src/index.js");
  
  const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
      if (!path) {
        reject(new Error("No agregó un ruta"));
      } else {
        const absolutePath = validatePath(path);
        const pathExists = existsPath(absolutePath);
        if (pathExists) {
          // obtener un array de archivos md.
          const mdArray = getMdArray(absolutePath);
          if (mdArray.length === 0) {
            reject(
              new Error("No es un archivo .md o la ruta no contiene archivos .md")
            );
          }
          //["1.md","2.md","3.md"]
          // promises => Map del array con las rutas .md -> leendo readFile(contenido en string)
          // -> extraer los links y nos devuelve el objecto basico
          const promises = mdArray.map((fileMD) => {
            return readFileMd(fileMD).then((response) => {
              if(Object.keys(response).length > 0){ //[path, file]
                return getLinksMd(response);
              }
              else{
                return [];
              }
            });
          });
  
          Promise.all(promises)
            .then((basicObject) => { //[file, href, text]
              const filteredObject= basicObject.filter((array) => array.length > 0);
              if (options.validate === true) {
                const statusPromises = filteredObject.map((response) => {
                  return getHttpStatus(response);
                });
  
                Promise.all(statusPromises)
                  .then((advancedObject) => {
                    resolve(advancedObject);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              } else {
                resolve(filteredObject);
              }
            })
            .catch((error) => {
              reject(error);
            });
        }
      }
    });
  };
  
  module.exports = {
    mdLinks,
  };
  