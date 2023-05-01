const fs = require("fs");

const pwd = function(environment) {
  const {pwd} = environment;
  return {pwd, output: [pwd]};
}

const hasNoArgument = function(argument) {
  return argument.length === 0;
}

const listContents = function(path) {
  if(!fs.existsSync(path)) {
    return `ls: ${path}: No such file or directory`;
  }

  const content = fs.readdirSync(path).join("\n");
  return `${path}:\n   ${content}`;
}

const ls = function(environment, ...paths) {
  const {pwd} = environment;
  let args = paths;

  if(hasNoArgument(paths)) {
    args = [pwd];
  }

  const output = args.map(listContents).join("\n");
  return {pwd, output};
}

const isParentDirectory = function(directory) {
  return directory === ".."
}

const isNotParentOrCurrentDirectory = function(directory) {
  return directory !== ".." && directory !== "."
}

const resolvePath = function(path) {
  const newPath = [];
  const directories = path.split("/");

  for(const directory of directories) {
    if(isParentDirectory(directory)) {
      newPath.pop();
    }

    if(isNotParentOrCurrentDirectory(directory)) {
      newPath.push(directory);
    }
  }

  return newPath.join("/");
}

const cd = function(environment, argument) {
  let {pwd} = environment;

  if(argument.startsWith("/")) {
    return {pwd: argument, output: []};
  }

  pwd += `/${argument}`;

  if(!fs.existsSync(pwd)) {
    pwd = environment.pwd;
    return {pwd, output: [`cd: no such file or directory: ${argument}`]};
  }

  pwd = resolvePath(pwd);

  return {pwd, output: []};
}

exports.pwd = pwd;
exports.ls = ls;
exports.cd = cd;
