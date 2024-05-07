import OpenAI from 'openai'
import { envs } from '../config'

export const openai = new OpenAI({
  apiKey: envs.OPENAI_API_KEY
})
