import { openai } from '../../../core'

export class ResourcesService {
  constructor() {}

  getBooksRecommendations = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        messages: [
          {
            role: 'assistant',
            content:
              'Necesito que me ayudes dándome un listado de libros recomendados que podrían ayudar a los padres en la crianza y educación de sus hijos. Limítate a darme el listado de los libros y quizá un mensaje de buena suerte al final, es decir, comienza el texto dándome el primer libro, no muestres texto como "Claro, aquí tienes una lista de libros recomendados para padres:".'
          }
        ]
      })

      return completion.choices[0]?.message?.content
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  getAudiovisualRecommendations = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        messages: [
          {
            role: 'assistant',
            content:
              'Necesito que me ayudes dándome un listado de series, películas y cualquier recurso audiovisual recomendados que podrían ayudar a los padres en la crianza y educación de sus hijos. Limítate a darme el listado de los recursos y quizá un mensaje de buena suerte al final, es decir, comienza el texto dándome el primer recurso, no muestres texto como "Claro, aquí te dejo una lista de series, películas y recursos audiovisuales recomendados para padres en la crianza y educación de sus hijos:".'
          }
        ]
      })

      return completion.choices[0]?.message?.content
    } catch (error) {
      throw error
    }
  }
}
