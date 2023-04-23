const prompt = require("prompt-sync")();
const OpenAI = require("./src/OpenAI.js");
const apiKey = process.env['OPENAI_API_KEY'];
const openAI = new OpenAI(apiKey);
const model = 'gpt-3.5-turbo';

const quitKeywords = ['quit','exit','bye'];

async function promptLoop() {
  let conversation = '';
  while (true) {
    const input = prompt('> ');
    if (quitKeywords.includes(input))
      break;
    conversation += `${input}\n`;
    await openAI.generateText(conversation, model, 1000)
      .then(response => {
        conversation += `${response}\n`;
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    console.log();
  }
}

promptLoop();
