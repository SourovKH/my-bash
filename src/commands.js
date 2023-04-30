const fs = require("fs");

const pwd = function(environment) {
  const {pwd} = environment;
  return {pwd, output: [pwd]};
}

const hasNoArgument = function(argument) {
  return argument.length === 0;
}

const ls = function(environment, ...argument) {
  const {pwd} = environment;
  let args = argument;

  if(hasNoArgument(argument)) {
    args = [pwd];
  }

  let output = args.map(function(arg) {
    let content = fs.readdirSync(arg).join("\n   ");
    content = `${arg}:\n   ${content}`;
    return content;
  });

  output = output.join("\n");
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

const cd = function(environment, ...arg) {
  let {pwd} = environment;
  const argument = arg.toString();

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
