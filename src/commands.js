const fs = require("fs");

const pwd = function(environment) {
  environment.outputs.push(environment.pwd);
  return environment;
}

const ls = function(environment) {
  const {pwd} = environment;
  environment.outputs.push(fs.readdirSync(pwd));
  return environment;
}

const cd = function(environment, arg) {
  environment.pwd += `/${arg}`;
  return environment;
}

exports.pwd = pwd;
exports.ls = ls;
exports.cd = cd;
