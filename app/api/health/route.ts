import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { z } from 'zod';

const HealthcareResponseSchema = z.object({
    issue: z.string(),
    symptom: z.string(),
    medication: z.string(),
    others: z.string(),
    severity: z.number(),
  });

export async function GET(request: Request) {
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
      });

    const responseMessage = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are a healthcare assistant that provides structured responses in JSON format. Please provide a healthcare assessment in the following structured format: Issue: (The primary health concern), symptom: (List the symptoms), Medication: (any medication the patient is using), Others: (Additional notes or observation), Severity: (a number between the range 1-99 that you will give by assessing the patient's situation)"
              },
              { role: "user", content: "I have a cold, with a runny nose and cough, it has been going on for 7 days, and I am not taking any medication" }
            ],
            response_format: zodResponseFormat(HealthcareResponseSchema, "event")
    })

    const response = responseMessage.choices[0].message.parsed;
  
    // Return the response with status 200 and content type JSON
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }