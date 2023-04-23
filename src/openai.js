const { Configuration, OpenAIApi } = require('openai');
class OpenAI {
  constructor(apiKey) {
    this.openai = new OpenAIApi(new Configuration({ apiKey }));
  }
  async generateText(prompt, model, max_tokens, temperature = 0.85) {
    try {
      const messages = [{role: 'user', content: prompt}];
      const response = await this.openai.createChatCompletion({
        model,
        messages,
        max_tokens,
        temperature,
      });
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OpenAI