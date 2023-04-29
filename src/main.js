const fs = require("fs");
const {parse} = require("./parser.js");
const {execute} = require("./execute-commands.js");

const main = function() {
  const script = fs.readFileSync(process.argv[2], "utf-8");
  const commands  = parse(script);
  const outputs = execute(commands);

  console.log(outputs.join("\n"));
}

main();
