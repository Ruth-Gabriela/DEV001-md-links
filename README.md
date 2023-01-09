# 📎 Markdown Links

## Índice

* [1. Introdución:](#1-Introdución)
* [2. Proceso de desarrollo:](#2-Proceso-de-desarrollo:)
* [3. Instrucciones de uso:](#3-Instrucciones-de-uso:)
* [4. Dependencias y Herramientas:](#4-Dependencias-y-Herramientas:)

***

## 1. Introdución:

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Esta herramienta, creada con Node.js, lee y analiza archivos en formato Markdown, para verificar los links que contengan y reportar algunas estadísticas.

![md-links](https://i.imgur.com/PiNgslF.png)

## 2. Proceso de desarrollo:

Como punto de partida para la ejecución de este proyecto, se elaboró la lógica y se diseñó un diagrama de flujo para organizar el proceso de la API.

* [Diagrama de flujo MD-LINKS]("https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.)
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FUjDPyqOxeUQakCHXf0YpIe%2FLibrer%25C3%25ADa---md---links%3Fnode-id%3D0%253A1%26t%3DSfzo2mmKguTyp1L8-1" allowfullscreen></iframe>

Si pasamos la opción que incluye `--validate`, el módulo debe hacer una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

## 3. Instrucciones de uso:

Este proyecto es una herramienta de línea de comando (CLI), una librería (o biblioteca - library) en JavaScript. Un programa que se ejecute usando Node.js. Utilizando procesos
(`process.env`, `process.argv`, ...), cómo interactuar con el sistema archivos, cómo hacer consultas de red, etc.

### Implementación

Este proyecto tiene varias partes: Lee el sistema de archivos, recibe argumentos a través de la línea de comando, analiza archivos markdown para extraer links validos y rotos.

Estas instrucciones le permitirán instalar la biblioteca en su computadora local para el desarrollo. Las rutas ingresadas pueden ser relativas o absolutas y las opciones que puede usar son: `--stats`, `--validate` o usar ambas juntas: `--stats --validate`.

### Instalación

Puedes hacer la instalación por `npm`:

```sh
npm i md-links-gpz
```

### Ejecución

##### `Caso 1:`

Al ingresar el comando `md-links` en la consola, retorna:

```sh
No agregó un ruta
```
##### `Caso 2:`

Al ingresar el comando `md-links <path-to-file>` en la consola, retorna `objeto básico`:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Por Ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

##### `Caso 3:`

Al ingresar el comando `md-links <path-to-file> --validate` en la consola, retorna `objeto avanzado`:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

Por Ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```
Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `Caso 4:`

Al ingresar el comando `md-links <path-to-file> --stats` en la consola, el output (salida) será un texto con estadísticas básicas sobre los links.

Por Ejemplo:

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```
##### `Caso 5:`

Al ingresar el comando `md-links <path-to-file> --stats --validate` en la consola, el output (salida) será un texto con estadísticas avanzadas sobre los links.

Por Ejemplo:


```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 4. Dependencias y Herramientas:

- [ ] **Node.js:**  Usado para crear la librería.
- [ ] **npm:**  Despliegue de módulo.
- [ ] **chalk:**  Usado para dar estilos en la terminal.
- [ ] **jest:**  Testing de funcionalidad.
- [ ] **axios:**  Peticiones HTTP.

### Autora: Ruth Gabriela Paucar Zambrano.