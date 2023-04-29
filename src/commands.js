const fs = require("fs");

const pwd = function(environment) {
  const {pwd} = environment;
  return {pwd, output: [pwd]};
}

const ls = function(environment) {
  const {pwd} = environment;
  const output = fs.readdirSync(pwd);
  return {pwd, output: [output]};
}

const cd = function(environment, arg) {
  let {pwd} = environment;

  if(arg.includes(pwd)) {
    return {pwd: arg, output: []};
  }

  pwd += `/${arg}`;
  return {pwd, output: []};
}

exports.pwd = pwd;
exports.ls = ls;
exports.cd = cd;
