const fs = require("fs");
const {parse} = require("./parser.js");
const {execute} = require("./execute-commands.js");

const main = function() {
  const scriptFilePath = process.argv[2];

  if(!fs.existsSync(scriptFilePath)) {
    console.log(`bash: No such file or directory: ${scriptFilePath}`);
    return;
  }

  const script = fs.readFileSync(scriptFilePath, "utf-8");
  const commands  = parse(script);
  const outputs = execute(commands);

  console.log(outputs.join("\n"));
}

main();
