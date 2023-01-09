#!/usr/bin/env node
const chalk = require("chalk");

const { mdLinks } = require("./main.js");
const {
  emptyOptions,
  onlyStats,
  onlyValidate,
  bothOptions,
} = require("./src/index.js");

const [, , ...args] = process.argv;
// console.log(args[0], args[1]);
const validate = args.includes("--validate");
const stats = args.includes("--stats");

mdLinks(args[0], { validate: validate })
  .then((result) => {
    // solo validate, sin nada, los 2, solo stats
    // console.log(result);
    if (validate) {
      if (stats) {
        const response = bothOptions(result);
        response.forEach((response) => {
          console.log("\n");
          console.log(
            chalk.blue.bold(
              "Enlaces en el archivo: " +
                chalk.whiteBright.bold(response.nameFile)
            )
          );
          console.log(chalk.cyan.bold("Total: " + response.total));
          console.log(chalk.cyan.bold("Unique: " + response.unique));
          console.log(chalk.cyan.bold("Broken: " + response.broken));
        });
      } else {
        const response = onlyValidate(result);
        response.forEach((response) => {
          const nameFile = response[0].split(" ")[0].split("\\");
          console.log("\n");
          console.log(
            chalk.blue.bold(
              "Enlaces en el archivo: " +
                chalk.whiteBright.bold(nameFile[nameFile.length - 1])
            )
          );
          console.log(chalk.cyan.bold(response.join("\n")));
        });
      }
    } else {
      if (stats) {
        const response = onlyStats(result);
        response.forEach((response) => {
          console.log("\n");
          console.log(
            chalk.blue.bold(
              "Enlaces en el archivo: " +
                chalk.whiteBright.bold(response.nameFile)
            )
          );
          console.log(chalk.cyan.bold("Total: " + response.total));
          console.log(chalk.cyan.bold("Unique: " + response.unique));
        });
      } else {
        const response = emptyOptions(result);
        response.forEach((response) => {
          const nameFile = response[0].split(" ")[0].split("\\");
          console.log("\n");
          console.log(
            chalk.blue.bold(
              "Enlaces en el archivo: " +
                chalk.whiteBright.bold(nameFile[nameFile.length - 1])
            )
          );
          console.log(chalk.cyan.bold(response.join("\n")));
        });
      }
    }
    //console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
  });
