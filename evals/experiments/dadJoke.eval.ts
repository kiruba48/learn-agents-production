import { runLLM } from '../../src/llm'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'
import { runEval } from '../evalTools'
import { ToolCallMatch } from '../scorers'

const createToolCallMessage = (toolName: string) => {
  return {
    role: 'user',
    tool_calls: [{
        type: 'function',
        function: {
          name: toolName,
        }
    }]
  }
}

export const dadJoke = {
  task: async (input: any) => {
    return runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [dadJokeToolDefinition],
    })
  },
  data: [
    {
      input: "Tell me a funny dad joke",
      expected: createToolCallMessage(dadJokeToolDefinition.name),
      // optional: reference: "reference_data"
    }
  ],
  scorers: [ToolCallMatch], // Add your scorers here
}

runEval('dadJoke', dadJoke)
