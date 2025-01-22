import { runLLM } from '../../src/llm'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
import { redditToolDefinition } from '../../src/tools/reddit'
import { dadJoke, dadJokeToolDefinition } from '../../src/tools/dadJoke'
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

  const tools = [
    generateImageToolDefinition,
    redditToolDefinition,
    dadJokeToolDefinition,
  ]

export const allTools = {
  task: async (input: any) => {
    return runLLM({
      messages: [{ role: 'user', content: input }],
      tools,
    })
  },
  data: [
    {
      input: "Generate an image of a dog",
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: "find me something interesting on reddit",
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: "Tell me a funny dad joke",
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    {
      input: "generate an image of a sunny beach",
      expected: createToolCallMessage(generateImageToolDefinition.name),
    }
  ],
  scorers: [ToolCallMatch], // Add your scorers here
}

runEval('allTools', allTools)
