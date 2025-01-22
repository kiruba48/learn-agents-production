import { runLLM } from '../../src/llm'
import { redditToolDefinition } from '../../src/tools/reddit'
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

export const redditEval = {
  task: async (input: any) => {
    return runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [redditToolDefinition],
    })
  },
  data: [
    {
      input: "find me something interesting on reddit",
      expected: createToolCallMessage(redditToolDefinition.name),
      // optional: reference: "reference_data"
    }
  ],
  scorers: [ToolCallMatch], // Add your scorers here
}

runEval('reddit', redditEval)
