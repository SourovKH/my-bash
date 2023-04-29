const fs = require("fs");

const pwd = function(environment) {
  const {pwd} = environment;
  return {pwd, output: [pwd]};
}

const ls = function(environment) {
  const {pwd} = environment;
  const output = fs.readdirSync(pwd).join("\t");
  return {pwd, output: [output]};
}

// cd arguments ==> .. , /, ../../something

const resolvePath = function(path) {
  const newPath = [];
  const directories = path.split("/");

  for(const currentDirectory of directories) {
    if(currentDirectory === "..") {
      newPath.pop();
    }

    if(currentDirectory !== ".."){
      newPath.push(currentDirectory);
    }
  }

  return newPath.join("/");
}

const cd = function(environment, arg) {
  let {pwd} = environment;

  if(arg.startsWith("/")) {
    return {pwd: arg, output: []};
  }

  pwd += `/${arg}`;

  if(!fs.existsSync(pwd)) {
    return {pwd, output: [`cd: no such file or directory: ${arg}`]};
  }

  pwd = resolvePath(pwd);

  return {pwd, output: []};
}

exports.pwd = pwd;
exports.ls = ls;
exports.cd = cd;
