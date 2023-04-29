const {pwd, ls, cd}= require("./commands.js");

const execute = function(args) {
  const commands = {pwd, ls, cd};
  let environment = {pwd: process.env.PWD, outputs: []};

  for(currentCommand of args) {
    const [command, argument] = currentCommand;
    environment = commands[command](environment, argument);
  }

  return environment.outputs;
}

exports.execute = execute;
