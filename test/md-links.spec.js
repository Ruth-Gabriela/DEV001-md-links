const axios = require('axios');
const assert = require('assert');
jest.mock('axios');

const path = require("path");
// const mdLinks = require('../');
const {
  validatePath,
  existsPath,
  validateExtName,
  getMdArray,
  pathIsDirectory,
  readFileMd,
  getHttpStatus,
  getLinksMd,
  validateUrls,
  emptyOptions,
  onlyValidate,
  onlyStats,
  bothOptions
} = require("../src/index.js");


let relativePathCorrect = "./src/testFiles/example.md";
let relativePathCorrect2 = "./src/testFiles/example2.md";
let relativePathIncorrect = "./src/testFiles/example123.md";
let relativePathTxt = "./src/testFiles/md/example.txt";
let relativePathDirectory = "./src/testFiles";
let absolutePathCorrect = path.resolve(relativePathCorrect);
let absolutePathCorrect2 = path.resolve(relativePathCorrect2);
let absolutePathIncorrect = path.resolve(relativePathIncorrect);
let emptyMdFile = path.resolve("./src/testFiles/empty.md");
let absolutePathTxt = path.resolve(relativePathTxt);
let absolutePathDirectory = path.resolve(relativePathDirectory);
const resultOptionsBasic = [
  [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\src\\testFiles\\example.md",
    },
    {
      href: "https://www.google.com",
      text: "Google",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\src\\testFiles\\example.md",
    },
  ],
  [
    {
      href: "https://nodejs.org/es/",
      text: "Node.js",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\src\\testFiles\\example2.md",
    },
    {
      href: "https://developers.google.com/v8gsdgs/",
      text: "motor Chrome",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\src\\testFiles\\example2.md",
    },
  ],
  [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\src\\testFiles\\example3.md",
    },
    {
      href: "https://nodejs.org/",
      text: "Node.js",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\example3.md",
    },
  ],
];

const resultOptionsAdvanced = [
  [
    {
      href: "https://es.wikipedia.org/wiki/Markdown",
      text: "Markdown",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\src\\testFiles\\example.md",
      status: 200,
      message: "ok",
    },
    {
      href: "https://www.google.com",
      text: "Google",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\src\\testFiles\\example.md",
      status: 200,
      message: "ok",
    },
  ],
  [
    {
      href: "https://nodejs.org/es/",
      text: "Node.js",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\src\\testFiles\\example2.md",
      status: 200,
      message: "ok",
    },
    {
      href: "https://developers.google.com/v8gsdgs/",
      text: "motor Chrome",
      file: "C:\\Users\\MAX\\Desktop\\Laboratoria\\DEV001-md-links\\src\\testFiles\\example2.md",
      status: 404,
      message: "fail",
    },
  ],
];

// test function validatePath and existsPath;
describe("Verificación de rutas", () => {
  it("La ruta absoluta no sufre cambios", () => {
    expect(validatePath(absolutePathCorrect)).toBe(absolutePathCorrect);
  });
  it("¿convertir la ruta a absoluta?", () => {
    expect(validatePath(relativePathCorrect)).toBe(absolutePathCorrect);
  });
  it("verificar que la ruta si existe", () => {
    expect(existsPath(absolutePathCorrect)).toBe(true);
  });
  it("verificar que la ruta no existe", () => {
    expect(() => {
      existsPath(absolutePathIncorrect);
    }).toThrow("La ruta no existe");
  });
});

// test function validateExtName;
describe("Verificación extensión de la ruta", () => {
  it("La extensión de la ruta debe ser: .txt", () => {
    expect(validateExtName(absolutePathTxt)).toBe(".txt");
  });
  it("La extensión de la ruta debe ser: .md", () => {
    expect(validateExtName(absolutePathCorrect)).toBe(".md");
  });
});

// test function getMdArray y pathIsDirectory;
describe("Validamos extension .md de la ruta", () => {
  it("Valida que la ruta es .md y devuelve un array", () => {
    expect(typeof getMdArray(absolutePathCorrect)).toEqual("object");
  });
  it("Valida que la ruta no es .md y devuelve array vacio", () => {
    expect(getMdArray(absolutePathTxt)).toStrictEqual([]);
  });
  it("Valida si la ruta si es un directorio", () => {
    expect(pathIsDirectory(absolutePathDirectory)).toBe(true);
  });
  it("Valida si la ruta no es un directorio", () => {
    expect(pathIsDirectory(absolutePathCorrect)).toBe(false);
  });
  it("Aplica recursividad y retorna la cantidad de elementos de un array", () => {
    expect(getMdArray(absolutePathDirectory).length).toBe(4);
  });
});

// test function readFileMd;
describe("Leemos el archivo y retorna una promesa resuelta o rechazada", () => {
  it("Lee el archivo y retorna un objeto", () => {
    readFileMd(absolutePathCorrect).then((result) => {
      expect(Object.keys(result).length).toEqual(2);
    });
  });
  it("Devolvemos un objeto vacio en caso el archivo .md no tenga contenido", () => {
    readFileMd(emptyMdFile).then((result) => {
      expect(Object.keys(result).length).toEqual(0);
    });
  });
});

// test function Options(CLI);
describe("Obtenemos los objetos para testear las options de CLI", () => {
  it("El resultado de no enviar 'options' debe devolver la ruta absoluta del archivo example.md ", () => {
    expect(emptyOptions(resultOptionsBasic)[0][0].split(" ")[0]).toBe(
      absolutePathCorrect
    );
  });
  it("El resultado de no enviar 'options' debe devolver la siguiente url en su primer elemento del array ", () => {
    expect(emptyOptions(resultOptionsBasic)[0][0].split(" ")[1]).toBe(
      "https://es.wikipedia.org/wiki/Markdown"
    );
  });
  it("El resultado de enviar solo '--stats' debe devolver la cantidad total de enlaces en el primer archivo", () => {
    expect(onlyStats(resultOptionsBasic)[0].total).toBe(2);
  });
  it("El resultado de enviar solo '--stats' debe devolver el nombre del primer archivo", () => {
    expect(onlyStats(resultOptionsBasic)[0].nameFile).toBe("example.md");
  });

  it("El resultado de enviar solo '--validate' debe devolver el estado de la petición http del primer enlace", () => {
    expect(onlyValidate(resultOptionsAdvanced)[0][0].split(" ")[3]).toBe(
      "200"
    );
  });
  it("El resultado de enviar solo '--validate' debe devolver el mensaje de la petición http del segundo enlace", () => {
    expect(onlyValidate(resultOptionsAdvanced)[1][1].split(" ")[2]).toBe(
      "fail"
    );
  });

  it("El resultado de enviar ambos '--stats --validate' debe devolver la cantidad de enlaces rotos del primer enlace", () => {
    expect(bothOptions(resultOptionsAdvanced)[0].broken).toBe(
      0
    );
  });
  it("El resultado de enviar ambos '--stats --validate' debe devolver la cantidad de enlaces únicos del segundo enlace", () => {
    expect(bothOptions(resultOptionsAdvanced)[1].unique).toBe(2);
  });
});

// test function getHttpStatus;
describe('Realizar petición http de tipo GET a Axios con la función getHttpStatus', () => {
  const urls = [{ href: 'https://google.com' }, { href: 'https://nodejs.org/fqfq' }];
  it('Debe retornar un status en específico para las URL dadas, según la promesa se cumpla o se rechace.', () => {
    // Configuración de la respuesta simulada para la primera URL
    axios.get.mockImplementationOnce(() => Promise.resolve({ status: 200 }));
  
    // Configuración de la respuesta simulada para la segunda URL
    axios.get.mockImplementationOnce(() => Promise.reject({ response: { status: 404 } }));
  
    getHttpStatus(urls).then((results) => {
      assert.equal(results[0].status, 200);
      assert.equal(results[0].message, 'ok');
      assert.equal(results[1].status, 404);
      assert.equal(results[1].message, 'fail');
    });
  }); 
});

// test function getLinksMd;
describe('La función getLinksMd obtiene un archivo md', () => {
  const path = '/path/to/file';
  const file = `
    Lorem ipsum dolor sit amet [link](http://link.com)
    consectetur adipiscing elit
    sed do eiusmod tempor [link2](https://link2.com)
    incididunt ut labore
    link interno [link3](/about)
  `;

  const arrayUrls = [
    {
      "file": "/path/to/file",
      "href": "http://link.com",
      "text": "link",
    },
    {
      "file": "/path/to/file",
      "href": "https://link2.com",
      "text": "link2",
    }, 
  ];

  it('Hace uso de expresiones regulares para obtener un array de links con un objeto básico', () => {
    expect(getLinksMd({ path, file })).toEqual(arrayUrls);
  }); 

});