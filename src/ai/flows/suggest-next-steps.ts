'use server';

/**
 * @fileOverview A flow for suggesting next steps or areas for improvement based on a codebase summary.
 *
 * - suggestNextSteps - A function that suggests next steps for codebase improvement.
 * - SuggestNextStepsInput - The input type for the suggestNextSteps function.
 * - SuggestNextStepsOutput - The return type for the suggestNextSteps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestNextStepsInputSchema = z.object({
  codebaseSummary: z
    .string()
    .describe('A summary of the codebase to suggest next steps for.'),
});
export type SuggestNextStepsInput = z.infer<typeof SuggestNextStepsInputSchema>;

const SuggestNextStepsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A list of suggested next steps or areas for improvement in the codebase.'
    ),
});
export type SuggestNextStepsOutput = z.infer<typeof SuggestNextStepsOutputSchema>;

export async function suggestNextSteps(input: SuggestNextStepsInput): Promise<SuggestNextStepsOutput> {
  return suggestNextStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestNextStepsPrompt',
  input: {schema: SuggestNextStepsInputSchema},
  output: {schema: SuggestNextStepsOutputSchema},
  prompt: `You are an AI expert in software development practices. Based on the following codebase summary, suggest potential next steps or areas for improvement.

Codebase Summary:
{{{codebaseSummary}}}

Suggestions:`,
});

const suggestNextStepsFlow = ai.defineFlow(
  {
    name: 'suggestNextStepsFlow',
    inputSchema: SuggestNextStepsInputSchema,
    outputSchema: SuggestNextStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
