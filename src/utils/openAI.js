import OpenAI from 'openai';
import { OPENAI_KEY } from './constants';

const openAI = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser:true
});


export default openAI;

// const response = await client.responses.create({
//   model: 'gpt-5.5',
//   instructions: 'You are a coding assistant that talks like a pirate',
//   input: 'Are semicolons optional in JavaScript?',
// });

// console.log(response.output_text);