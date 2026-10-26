const { OpenAI } = require("openai");
const { Agent, run, setDefaultOpenAIClient } = require("@openai/agents");
const { getBearerTokenProvider, DefaultAzureCredential } = require("@azure/identity");

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT;
const tokenProvider = getBearerTokenProvider(
    new DefaultAzureCredential(),
    "https://ai.azure.com/.default"
);

const client = new OpenAI({
    baseUrl: endpoint,
    apiKey: tokenProvider
});

setDefaultOpenAIClient(client);

const agent = new Agent({
    name: "Test Agent",
    instructions: "You are a helpful assistant. Answer user's queries.",
    model: deploymentName
});

(async function() {
    const result = await run(agent, "What is 2 + 2 = ?");
    
})();