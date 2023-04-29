const parse = function(script) {
  const commands = script.trim().split("\n");

  return commands.map(function(command) {
    return command.split(" ");
  });
}

exports.parse = parse;
