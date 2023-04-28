const fs = require("fs");

let PWD = process.env.PWD;

const pwd = function() {
  return PWD;
}

const ls = function() {
  return fs.readdirSync(PWD);
}

const cd = function(arg) {
  PWD = `${PWD}/${arg}`;
  return PWD;
}

const commands = {
  "pwd": pwd,
  "ls": ls,
  "cd": cd
}

const runBash = function(args) {
  return args.map(function(arg) {
    const command = arg[0];
    const argument = arg[1];

    return commands[command](argument);
  });
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

  return runBash(commands).join("\n");
}


console.log(main());
