const fs = require("fs");

const pwd = function(environment) {
  environment.outputs.push(environment.pwd);
  return environment;
}

const ls = function(environment) {
  const {pwd} = environment;
  environment.outputs.push(fs.readdirSync(pwd));
  return environment;
}

const cd = function(environment, arg) {
  environment.pwd += `/${arg}`;
  return environment;
}

const commands = {pwd, ls, cd};

const runBash = function(args, environment) {
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
  const script = fs.readFileSync(`${scriptFile}`, "utf-8");
  const commands  = parse(script);
  const pwd = process.env.PWD;
  const environment = {pwd, outputs: []};
  const {outputs} = runBash(commands, environment);

  console.log(outputs.join("\n"));
}

main();
