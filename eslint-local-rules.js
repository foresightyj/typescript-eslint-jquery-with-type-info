"use strict";
const forbiddenMethodsOfType = require("./build/rules/forbidden-methods-of-type");
module.exports = {
  "forbidden-methods-of-type": forbiddenMethodsOfType.default,
};
