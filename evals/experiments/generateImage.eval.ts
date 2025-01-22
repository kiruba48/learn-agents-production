import { runLLM } from '../../src/llm'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
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

export const generateImage = {
  task: async (input: any) => {
    return runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [generateImageToolDefinition],
    })
  },
  data: [
    {
      input: "Generate an image of a dog",
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    // {
    //   input: "Get the weather report for tomorrow",
    //   expected: createToolCallMessage(generateImageToolDefinition.name),
    // }
  ],
  scorers: [ToolCallMatch], // Add your scorers here
}

runEval('generateImage', generateImage)
