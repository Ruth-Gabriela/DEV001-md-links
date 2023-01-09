// Expresiones regulares:
const separateLinks = /\[([^\]]+)\]\(([^)]+)\)/;
const findLinksMd = /\[([^\]]+)\]\(([^)]+)\)/g;
const verifyValidUrl = 
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;


// Obtiene o extrae los links de un archivo .md
const getLinksMd = ({ path, file }) => {
  const textInRows = file.split('\n');
  const arrayLinks = [];
  for (const row of textInRows) {
    const validateRegex = row.match(findLinksMd);
    if(validateRegex) {
      arrayLinks.push(validateRegex);
    }
  }
  // Llamamos a la función que extrae solo los enlaces validos (http || https)
  const verifyLinks = validateUrls(path, [].concat(...arrayLinks)); // concat en vez de flat()
  return verifyLinks;
}


const validateUrls = (path, arrayUrls) => {
  const arrayLinks = [];
  for (const url of arrayUrls) {
    const separateUrlLinks = url.match(separateLinks);
    const verifyUrl = separateUrlLinks[2].match(verifyValidUrl);
    if (verifyUrl) {
      arrayLinks.push({
        href: separateUrlLinks[2],
        text: separateUrlLinks[1],
        file: path,
      })
    }
  }
  return arrayLinks;
};

module.exports = {
  getLinksMd,
  validateUrls,
};
