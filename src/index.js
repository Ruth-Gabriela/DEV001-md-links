const existsPath = require("./existsPath.js");
const validatePath = require("./validatePath.js");
const { readFileMd } = require("./readFile.js");
const { getLinksMd, validateUrls } = require("./regexLinks.js");
const getHttpStatus = require("./httpRequests.js");
const { getMdArray, pathIsDirectory, readDirectory, validateExtName } = require("./getMdArray.js");
const { emptyOptions, onlyValidate, onlyStats, bothOptions } = require("./options.js");

module.exports = {
  existsPath,
  validatePath,
  readFileMd,
  getLinksMd,
  validateUrls,
  getHttpStatus,
  getMdArray,
  pathIsDirectory,
  readDirectory,
  validateExtName,
  emptyOptions,
  onlyValidate,
  onlyStats,
  bothOptions,
};