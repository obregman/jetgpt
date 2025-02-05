const OpenAI = require('openai');
require('dotenv').config();

const model = 'gpt-4o-mini';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function queryChatGPT(prompt, maxTokens) {
    try {
        const response = await openai.chat.completions.create({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxTokens
        });
        return response.choices[0].message.content;
    } catch (error) {
        return 'Error querying ChatGPT: ' + error
    }
}

module.exports = queryChatGPT;