# Workshop 5: Tool Calling & MCP Integration

**Presenter: Orlando**  
**Duration: 30 minutes**  
**Integration Layer**

## 🎯 Learning Objective

Participants will implement tool calling functionality and Model Context Protocol (MCP) integration, enabling the AI system to interact with external APIs and business systems while orchestrating all previous workshop components into a unified tool calling LLM agent.

## 🔧 Integration Architecture

This workshop establishes the **Integration Layer** of our tool calling LLM agent:

```
┌─────────────────────────────────────────────────────────────┐
│                Integration Layer (Workshop 5)               │
│           MCP Protocol + Tool Calling (Toolhouse.ai)        │
│                                                             │
│  • Model Context Protocol Implementation                    │
│  • External API Integration                                 │
│  • Business System Connectivity                             │
│  • Tool Orchestration Framework                             │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Key Technologies & Tools

### Primary Platform Integration

- **[Toolhouse.ai](https://toolhouse.ai)** - Comprehensive platform for tool calling
- **Model Context Protocol (MCP)** - Standard interface for AI tool integration
- **API Integration Frameworks** - RESTful and GraphQL API connectivity
- **Business System Connectors** - Enterprise system integration
- **Other tools** - Various dev tools that are used to scaffold MCP and libraries

## 📋 Workshop Content Structure

### 1. Learning Objective (2 minutes)

**Clear, Measurable Outcome:**

- Implement MCP protocol for standardized tool integration
- Connect to external APIs and business systems via Toolhouse.ai
- Create tool orchestration workflows that coordinate all workshop components
- Build comprehensive tool calling framework for the AI agent

### 2. Concept Introduction (5 minutes)

**Theory and Business Context:**

- **Model Context Protocol**: Standardizing AI-tool communication
- **Tool Calling Architecture**: How AI agents interact with external systems
- **Business System Integration**: Connecting AI to enterprise workflows
- **Tool Orchestration**: Coordinating multiple tools for complex tasks

### 3. Implementation (20 minutes)

**Step-by-Step Implementation:**

#### Toolhouse MCP Server Setup

1. Open a new tab in a browser of choice
2. Navigate to https://join.toolhouse.ai/ and do the minimal onboarding
3. Navigate to https://app.toolhouse.ai/bundles
4. Create a new Bundle button
5. Enable the MCP server called "perplexity_byok" (use browser search to quickly get it)
6. Use this APIKEY `pplx-kZnmPPyoXTURjdN63iDZo3q7UszRDdNywld0QzazRo8cMX`
7. Type in the configuration: plaintext
8. Also enable the server called "send_email"
9. Change the name of the bundle to websearch (it will automatically save)

#### Toolhouse Agent Creation

Now that you set up a bundle and your MCP Servers it's time to create an agent that does something for you.
In this specific workshop we're going to create an agent which automatically emails you when there are tech/AI events happening on the Monday of every week.
To do this we need to create a new agent.

1. Navigate to https://app.toolhouse.ai/agents
2. Click on the "Create new agent" button
3. We're going to select the bundle we created from the menu
4. We're now going to write a prompt:

```
You are an event assistant, specifically you scrape data from https://lu.ma/austin. Your job is to find and filter events for July 2025. You only want to tell the user about AI and Tech event. Do not include any other events. You will return the results in a plain text list possible. Use the following fields where possible: title, date, time, location, and description. If there are no events found, return a message to say so.
```

5. Run the agent
6. Amend the prompt by adding the following text

```
Finally send an email message to the user. This is the user's email address PUTYOUR@EMAIL.HERE
Use HTML to format the email so it looks nicely, using bullet-points and styling the text with bold, italic etc.
```

7. Run the agent again and notice how you will receive an email with the results (check spam if you don't see it)
8. Success you build your first agent.
9. Click on "Continue" to deploy your agent
10. Notice that you can now use this agent via API or scheduling it!

#### Toolhouse Agent Scheduling

1. Navigate to https://app.toolhouse.ai/schedules
2. Click on Create a new Schedule
3. From the 1st dropdown, select the agent you just built
4. From the 2nd dropdown, select the bundle you created
5. In the "Cadence" field write "Every Monday morning, every week"
6. Click "Create schedule"

#### MCP client setup

1. Download an MCP Client of your choice:

- Claude Desktop
- Cursor
- VSCode

2. Set up the Toolhouse MCP Server following this link: https://github.com/toolhouse-community/mcp-server-toolhouse.
   You might need to install `uv and uvx`. Use the following command `curl -LsSf https://astral.sh/uv/install.sh | sh`
3. Find your API KEY here: https://app.toolhouse.ai/settings/api-keys
4. Set up the MCP server in your client. The following settings might differ per MCP client.

```
{
  "mcpServers": {
    "mcp-server-toolhouse": {
      "command": "uvx",
      "args": ["mcp_server_toolhouse"],
      "env": {
        "TOOLHOUSE_API_KEY": "your_toolhouse_api_key",
        "TOOLHOUSE_BUNDLE": "a_bundle_name"
      }
    }
  }
}
```

### 3. Advanced Workflow Orchestration

In this part of the workshop we are going to use an external MCP.
In addition to the MCP we're going to install the Toolhouse CLI.

1. Install the CLI with the following command in a terminal of choice: `npm i -g @toolhouseai/cli`
2. Type in a terminal: `th --version` and check if the command works
3. Connect the CLI to your Toolhouse account with `th login`
4. Create a new agent with `th new`
5. Follow the steps on screen
6. Open the file you just created and edit it to match the following:
7.

## 🔗 Connection to Final Agent

Using the CLI you're going to run and deploy your agent
Here's how you can do it

### How This Workshop Contributes:

1. **Tool Orchestration**: Coordinates all workshop components into unified functionality
2. **External Integration**: Connects the AI agent to external APIs and business systems
3. **Workflow Automation**: Creates complex multi-step processes using all available tools
4. **Protocol Standardization**: Implements MCP for consistent tool interaction
5. **Scalable Architecture**: Provides framework for adding new tools and capabilities

### Integration Points:

- **Workshop 1**: Project planning tools become part of the orchestrated toolkit
- **Workshop 2**: Memory system stores all tool executions and workflow history
- **Workshop 3**: Marketing AI and voice tools integrate into customer engagement workflows
- **Workshop 4**: Video generation becomes available as orchestrated tool capability
- **Workshop 6**: Local AI processing supports tool execution and decision-making

## 📚 Resources & Further Learning

### Documentation

- [Toolhouse.ai Documentation](https://docs.toolhouse.ai/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Tool Calling Best Practices](https://platform.openai.com/docs/guides/function-calling?api-mode=responses)

### Next Steps

- Test complete tool orchestration with all workshop components
- Prepare for Workshop 6: Local AI Deployment
- Optimize tool execution performance
- Document complete agent capabilities

---

**This workshop transforms our AI agent into a powerful orchestrator capable of coordinating all previous workshop components while connecting to external systems, creating a truly comprehensive tool calling LLM agent.**
