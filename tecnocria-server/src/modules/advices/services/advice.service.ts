import { openai } from '../../../core'

export class AdviceService {
  constructor() {}

  getAdvices = async (title: string) => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        messages: [
          {
            role: 'assistant',
            content:
              'Eres un asistente que le esta dando consejos a los padres para ayudarlos con la crianza y la educación de sus hijos, en base a la siguiente categoría necesito que me des un lista de consejos para ayudar a los padres. Limítate a darme el listado de los consejos y quizá un mensaje de buena suerte al final, es decir, comienza el texto dándome el primer consejo, no muestres texto como "¡Claro! Aquí tienes una lista de consejos para ayudar a los padres:".'
          },
          { role: 'system', content: title }
        ]
      })

      return completion.choices[0]?.message?.content
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  giveMeAnAdvice = async (message: string) => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        messages: [
          {
            role: 'assistant',
            content:
              'Eres un asistente que le esta dando consejos a los padres para ayudarlos con la crianza y la educación de sus hijos, en base al siguiente mensaje de un padre necesito que le des un lista de consejos para ayudarlo.'
          },
          { role: 'system', content: message }
        ]
      })

      return completion.choices[0]?.message?.content
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
