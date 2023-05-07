const term = require('terminal-kit').terminal;
const OpenAI = require("./src/OpenAI.js");
const model = 'gpt-3.5-turbo';

async function cmdLinePrompt() {
  const apiKey = process.env['OPENAI_API_KEY'];
  if (!apiKey) {
    term.red('OpenAI key is missing. Please add environment variable OPENAI_API_KEY\n');
  }
  const openAI = new OpenAI(apiKey);
  const prompt = process.argv.splice(2).join(' ');
  await openAI.generateText(prompt, model, 1000)
    .then(text => {
      term.cyan(`${text}\n`);
    })
    .catch(error => {
      term.red(`${error}\n`);
    });
  console.log();
}
cmdLinePrompt();
