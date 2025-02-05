const term = require('terminal-kit').terminal;
const queryChatGPT = require("./src/chatgpt.js");

const maxTokens = 1000;

async function cmdLinePrompt() {
  const apiKey = process.env['OPENAI_API_KEY'];
  if (!apiKey) {
    term.red('OpenAI key is missing. Please add environment variable OPENAI_API_KEY\n');
  }

  prompt = process.argv.splice(2).join(' ');
  await queryChatGPT(prompt, maxTokens)
    .then(text => {
      term.cyan(`${text}\n`);
    })
    .catch(error => {
      term.red(`${error}\n`);
    });
}
cmdLinePrompt();
