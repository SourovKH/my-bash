const fs = require("fs");

const pwd = function(environment) {
  const {pwd} = environment;
  return {pwd, output: [pwd]};
}

const resolvePath = function(pwd, path) {
  const newPath = pwd.split("/");
  const directories = path.split("/");

  if(directories.includes("~")) {
    directories.splice(0, 1);
    return `${process.env.HOME}/${directories.join("/")}`;
  }

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

const listContents = function(path) {
  if(path === "~") {
    const contents = fs.readdirSync(process.env.HOME).join("\n   ");
    return `${path}:\n   ${contents}`;
  }

  if(!fs.existsSync(path)) {
    return `ls: ${path}: No such file or directory`;
  }

  const contents = fs.readdirSync(path).join("\n   ");

  return `${path}:\n   ${contents}`;
}

const ls = function(environment, ...paths) {
  const {pwd} = environment;
  let args = paths;

  if(paths.length === 0) {
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

const cd = function(environment, path) {
  const {pwd} = environment;

  if(path === undefined) {
    return {pwd: process.env.HOME, output: []};
  }

  const potentialPWD = resolvePath(pwd, path);

  if(path.startsWith("/") && fs.existsSync(potentialPWD)) {
    return {pwd: potentialPWD, output: []};
  }

  if(!fs.existsSync(potentialPWD)) {
    return {pwd: environment.pwd, output: [`cd: No such file or directory: ${path}`]};
  }

  return {pwd: potentialPWD, output: []};
}

exports.pwd = pwd;
exports.ls = ls;
exports.cd = cd;
