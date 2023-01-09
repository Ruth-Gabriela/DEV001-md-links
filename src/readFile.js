const fs = require("fs");

const readFileMd = (absolutePath) => {
  // Lee el archivo de la ruta y la convierte en String.
  // Formato original Buffer
  return new Promise((resolve, reject) => {
    const buffer = fs.readFileSync(absolutePath, "utf-8");
    if (buffer) {
      const fileContent = buffer.toString();
      resolve({ path: absolutePath, file: fileContent });
    }
    else{
      resolve({});
    }
  });
};

module.exports = {
  readFileMd,
};
