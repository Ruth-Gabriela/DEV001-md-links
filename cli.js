const emptyOptions = (arrayLinks) => {
    return arrayLinks.map((array) => {
      return array.map((link) => `${link.file} ${link.href} ${link.text}`);
    });
  };
  
  const onlyValidate = (arrayLinks) => {
    return arrayLinks.map((array) => {
      return array.map(
        (link) =>
          `${link.file} ${link.href} ${link.message} ${link.status} ${link.text}`
      );
    });
  };
  
  const onlyStats = (arrayLinks) => {
    return arrayLinks.map((array) => {
      let total = array.length;
      const links = array.map((link) => link.href);
      // @set: estructura de datos que ayuda a eliminar elementos duplicados de un array.
      const unique = new Set(links);
      const nameFile = array[0].file.split("\\");
      return {
        total: total,
        unique: Array.from(unique).length,
        nameFile: nameFile[nameFile.length - 1],
      };
    });
  };
  
  const bothOptions = (arrayLinks) => {
    return arrayLinks.map((array) => {
      let total = array.length;
      const links = array.map((link) => link.href);
      const broken = array.filter((object) => object.status >= 400);
      const unique = new Set(links);
      // console.log(unique);
      const nameFile = array[0].file.split("\\");
      return {
        total: total,
        unique: Array.from(unique).length,
        broken: broken.length,
        nameFile: nameFile[nameFile.length - 1],
      };
    });
  };
  
  module.exports = {
    emptyOptions,
    onlyValidate,
    onlyStats,
    bothOptions,
  };