import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { Workflow, WorkflowBlock } from "@wove/db";

async function runWorkflow(
  workflow: Workflow & {
    blocks: WorkflowBlock[];
  },
) {
  console.log("Starting workflow...");

  const chat = new ChatOpenAI({
    modelName: process.env.OPENAI_MODEL_NAME ?? "gpt-3.5-turbo",
  });
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "The following is a friendly conversation between a human and an AI. The AI is straight-to-the-point and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. If the user asks for a list, the AI should give the list directly without adding text before or after the list. If appropriate, you can return some or all of your response as Markdown. This includes using appropriate headings, lists, code snippets, Mermaid diagrams, etc.",
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);
  const chain = new ConversationChain({
    memory: new BufferMemory({
      returnMessages: true,
      memoryKey: "history",
    }),
    prompt: chatPrompt,
    llm: chat,
  });

  // For each block, we want to call the chain with the block's text.
  const runs: {
    blockId: string;
    logs: string;
  }[] = [];

  for (const block of workflow.blocks) {
    const res = await chain.call({
      text: block.description,
    });
    if ("response" in res) {
      runs.push({
        blockId: block.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        logs: res.response,
      });
    }
  }

  console.log("Workflow complete.");
  return runs;
}

export default runWorkflow;
