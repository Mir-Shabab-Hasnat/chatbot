import { NextApiRequest, NextApiResponse } from "next";
import {OpenAI} from "openai";
import {zodResponseFormat} from "openai/helpers/zod"
import { z } from 'zod';

// Define the healthcare response schema
const HealthcareResponseSchema = z.object({
  issue: z.string(),
  symptom: z.string(),
  medication: z.string(),
  others: z.string(),
  severity: z.number(),
});

const client = new OpenAI({
  apiKey: process.env.OPEN_API_KEY
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { messages } = req.body;
    
        try {
          const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are a healthcare assistant that provides structured responses in JSON format. Please provide a healthcare assessment in the following structured format: Issue: (The primary health concern), symptom: (List the symptoms), Medication: (any medication the patient is using), Others: (Additional notes or observation), Severity: (a number between the range 1-99 that you will give by assessing the patient's situation)"
              },
              { role: "user", content: messages }
            ],
            response_format: zodResponseFormat(HealthcareResponseSchema, "event")
          });
    
          const event = completion.choices[0].message;
    
          // You can parse the response here to your required format
          res.status(200).json(event); // Send back the parsed response
        } catch (error) {
          console.error('Error fetching from OpenAI:', error);
          res.status(500).json({ error: 'Error fetching from OpenAI' });
        }
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}