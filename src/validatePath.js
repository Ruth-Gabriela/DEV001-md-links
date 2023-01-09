const path = require("path");

const validatePath = (pathName) => {
  // @isAbsolute: valida si la ruta es absoluta -> retorna true || false.
  const checkingPath = path.isAbsolute(pathName);
  if (!checkingPath) {
    // La ruta es relativa: Unimos nuestra ruta actual con la ruta engresada por parámetro usando método (join)
    // const absolutePath = path.join(__dirname, pathName);
    const absolutePath = path.resolve(pathName);
    return absolutePath;
  }
  // Si la ruta es absoluta: retornamos la ruta sin modificar nada.
  return pathName;
}

module.exports = validatePath;