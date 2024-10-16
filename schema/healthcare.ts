import { z } from 'zod';

// Define the healthcare response schema
const HealthcareResponseSchema = z.object({
  issue: z.string(),
  symptom: z.string(),
  medication: z.string(),
  others: z.string(),
  severity: z.string(),
});

export type HealthcareResponse = z.infer<typeof HealthcareResponseSchema>;