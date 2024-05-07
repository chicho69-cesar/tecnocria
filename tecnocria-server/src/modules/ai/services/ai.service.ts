import { openai } from '../../../core'

export class AIService {
  constructor() {}

  testAI = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        messages: [{ role: 'user', content: 'Say this is a test' }]
      })

      return completion.choices[0]?.message?.content
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
