const commands = require("./commands.js");

const isValidCommand = function(commandName) {
  return commandName in commands;
}

const execute = function(commandList) {
  const environment = {pwd: process.env.PWD, outputs: []};

  return commandList.reduce(function(environment, commandWithArgs) {
    const [command, argument] = commandWithArgs;

    if(isValidCommand(command)) {
      const commandToExecute = commands[command];
      const newEnvironment = commandToExecute(environment, argument);
      const outputs = environment.outputs.concat(newEnvironment.output);

      return {pwd: newEnvironment.pwd, outputs};
    }

    const errorMessage = `bash: command not found: ${command}`;
    const outputs = environment.outputs.concat(errorMessage);

    return {pwd: environment.pwd, outputs};
  }, environment).outputs;
}

exports.execute = execute;
