const fs = require("fs");
const {pwd, ls, cd}= require("./commands.js");

const runBash = function(args, environment) {
  const commands = {pwd, ls, cd};
  return args.reduce(function(environment, arg) {
    const [command, argument] = arg;
    const {outputs} = commands[command](environment, argument);
    return environment;
  }, environment);
}

const parse = function(script) {
  const commands = script.trim().split("\n");

  return commands.map(function(command) {
    return command.split(" ");
  });
}

const main = function() {
  const scriptFile = process.argv[2];
  const script = fs.readFileSync(scriptFile, "utf-8");
  const commands  = parse(script);
  const pwd = process.env.PWD;
  const environment = {pwd, outputs: []};
  const {outputs} = runBash(commands, environment);

  console.log(outputs.join("\n"));
}

main();
