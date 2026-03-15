import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, 'dist', 'index.js');

type ListToolsResponse = {
  tools: Array<{ name: string }>;
};

type ToolCallResponse = {
  isError?: boolean;
  content?: Array<{ type: string; text: string }>;
};

async function testServer() {
  console.log('🚀 Starting MCP Server verification test...');

  const transport = new StdioClientTransport({
    command: 'node',
    args: [serverPath],
    env: {
      ...process.env,
      NODE_ENV: 'test',
    },
  });

  const client = new Client(
    {
      name: 'test-client',
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  try {
    await client.connect(transport);
    console.log('✅ Connected to MCP Server');

    // Test ListTools
    const tools = (await client.listTools()) as ListToolsResponse;
    console.log(
      '📋 Available Tools:',
      tools.tools.map((t) => t.name).join(', ')
    );

    if (tools.tools.length === 0) {
      throw new Error('No tools listed!');
    }

    // Test CallTool (pattern-detect)
    console.log("🔍 Testing 'pattern-detect'...");
    const rootDir = '/Users/pengcao/projects/aiready'; // Test on current repo
    const result = (await client.callTool({
      name: 'pattern-detect',
      arguments: { path: rootDir },
    })) as ToolCallResponse;

    if (result.isError) {
      console.error(
        '❌ Tool execution failed:',
        result.content?.[0]?.text || 'Unknown MCP error'
      );
    } else if (result.content?.[0]?.text) {
      console.log('✅ Tool execution success!');
      const data = JSON.parse(result.content[0].text);
      console.log(
        `📊 Found ${data.duplicates?.length || 0} duplicate patterns.`
      );
    } else {
      throw new Error('Tool call returned no content');
    }
  } catch (error) {
    console.error('💥 Test failed:', error);
  } finally {
    console.log('🏁 Verification test complete.');
    process.exit(0);
  }
}

testServer();
