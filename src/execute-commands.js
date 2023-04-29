const commands = require("./commands.js");

const execute = function(args) {
  let environment = {pwd: process.env.PWD, outputs: []};

  for(const currentCommand of args) {
    const [command, argument] = currentCommand;
    const newEnvironment = commands[command](environment, argument);
    environment.pwd = newEnvironment.pwd;
    environment.outputs = environment.outputs.concat(newEnvironment.output);
  } 

  return environment.outputs;
}

exports.execute = execute;
