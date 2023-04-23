const OpenAI = require("./src/OpenAI.js");
const apiKey = process.env['OPENAI_API_KEY'];
const openAI = new OpenAI(apiKey);
const model = 'gpt-3.5-turbo';

async function cmdLinePrompt() {
  const prompt = process.argv.splice(2).join(' ');
  await openAI.generateText(prompt, model, 1000)
    .then(text => {
      console.log(text);
    })
    .catch(error => {
      console.error(error);
    });
  console.log();
}
cmdLinePrompt();
