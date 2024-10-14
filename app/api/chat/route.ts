import {openai} from "@ai-sdk/openai"
import { streamText, StreamData, CoreMessage, CoreAssistantMessage } from "ai";



export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages: CoreMessage[] = body.messages;

        const systemMessage: CoreAssistantMessage = {
            role: "assistant",
            content: "You are an intelligent healthcare assistant who will be asking patients about the health issues they are facing and asking them more questions along the way to learn more about what they are facing. You do not answer questions; you ask the user questions instead and ask them more questions until satisfied. When you are satisfied, ask the user if they have anything to add, and when they say they are done, stop taking in information and refuse to reply.",
           
        };

        messages.unshift(systemMessage)

        // Create a new StreamData
        const data = new StreamData();
        data.append({ test: 'value' });  // You can customize this as needed

        // Call the language model
        const result = await streamText({
            model: openai('gpt-4o-mini'),
            onFinish() {
                data.close();
            },
            messages,
        });

        // Respond with the stream and additional StreamData
        return result.toDataStreamResponse({ data });

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}