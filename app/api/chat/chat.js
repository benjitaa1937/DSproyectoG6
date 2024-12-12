import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      });

      res.status(200).json({ reply: response.data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: 'Error comunicándose con la API de OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
