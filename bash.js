const fs = require("fs");

let pWD = process.env.PWD;

const pwd = function() {
  return pWD;
}

const ls = function() {
  return fs.readdirSync(pWD);
}

const cd = function(arg) {
  pWD = `${pWD}/${arg}`;
  return pWD;
}

const commands = {
  "pwd": pwd,
  "ls": ls,
  "cd": cd
}

const runBash = function(args) {
  return args.map(function(arg) {

    if(arg.indexOf(" ") > 0) {
      const command = arg.split(" ");

      return commands[command[0]](command[1]);
    }

    return commands[arg]();
  });
}

const extractCommands = function(script) {
  let commands = script.trim().split("\n");

  return commands;
}

const main = function() {
  const scriptFile = process.argv[2];
  const script = fs.readFileSync(`${scriptFile}`, "utf-8");
  const commands  = extractCommands(script);

  return runBash(commands).join("\n");
}


console.log(main());
