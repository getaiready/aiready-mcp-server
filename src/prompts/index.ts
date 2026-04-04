import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

export function registerPromptHandlers(server: any) {
  // List available prompts
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: [
        {
          name: 'analyze-project',
          description:
            'Audit the project for AI-readiness and suggest improvements.',
          arguments: [
            {
              name: 'path',
              description: 'Path/directory to analyze',
              required: true,
            },
          ],
        },
        {
          name: 'remediate-issue',
          description: 'Help the user fix a specific AIReady issue.',
          arguments: [
            {
              name: 'issueId',
              description: 'The unique ID of the issue to fix',
              required: true,
            },
          ],
        },
      ],
    };
  });

  // Get prompt content
  server.setRequestHandler(GetPromptRequestSchema, async (request: any) => {
    const { name, arguments: args } = request.params;

    if (name === 'analyze-project') {
      const path = args?.path || '.';
      return {
        description: 'Project audit instructions',
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I want to audit the project at "${path}" for AI-readiness. Please use the AIReady tools to identify duplication patterns, context fragmentation, and naming inconsistencies. Then, provide a prioritized list of improvements to help me leverage AI agents more effectively.`,
            },
          },
        ],
      };
    }

    if (name === 'remediate-issue') {
      const issueId = args?.issueId;
      return {
        description: 'Issue remediation instructions',
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `I've identified an AIReady issue with ID: ${issueId}. Please use the \`get_remediation_diff\` tool to find a fix, explain the rationale behind the recommended change, and then help me apply it to the codebase.`,
            },
          },
        ],
      };
    }

    throw new Error(`Prompt not found: ${name}`);
  });
}
