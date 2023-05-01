const commands = require("./commands.js");

const isValidCommand = function(commandName) {
  return commandName in commands;
}

const execute = function(commandList) {
  const environment = {pwd: process.env.PWD, outputs: []};

  return commandList.reduce(function(environment, commandWithArgs) {
    const [commandName, ...argument] = commandWithArgs;

    if(isValidCommand(commandName)) {
      const commandToExecute = commands[commandName];
      const {pwd, output} = commandToExecute(environment, ...argument);
      const outputs = environment.outputs.concat(output);

      return {pwd, outputs};
    }

    const errorMessage = `bash: command not found: ${command}`;
    const outputs = environment.outputs.concat(errorMessage);

    return {pwd, outputs};
  }, environment).outputs;
}

exports.execute = execute;
