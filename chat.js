const term = require('terminal-kit').terminal;
const prompt = require("prompt-sync")();
const OpenAI = require("./src/OpenAI.js");
const model = 'gpt-3.5-turbo';

const quitKeywords = ['quit','exit','bye'];

async function promptLoop() {
  const apiKey = process.env['OPENAI_API_KEY'];
  if (!apiKey) {
    term.red('OpenAI key is missing. Please add environment variable OPENAI_API_KEY\n');
  }
  const openAI = new OpenAI(apiKey);

  let conversation = '';
  while (true) {
    const input = prompt('> ');
    if (quitKeywords.includes(input))
      break;
    conversation += `${input}\n`;
    await openAI.generateText(conversation, model, 1000)
      .then(response => {
        conversation += `${response}\n`;
        term.cyan(`${response}\n`);
      })
      .catch(error => {
        term.red(`${error}\n`);
      });
    console.log();
  }
}
promptLoop();
