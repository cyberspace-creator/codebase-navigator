'use server';

/**
 * @fileOverview Provides a Genkit flow to summarize a codebase given its directory structure.
 *
 * - summarizeCodebase - A function that takes a directory structure as input and returns a summarized overview of the codebase.
 * - SummarizeCodebaseInput - The input type for the summarizeCodebase function.
 * - SummarizeCodebaseOutput - The return type for the summarizeCodebase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCodebaseInputSchema = z.string().describe(
  'A string representing the directory structure of the codebase. ' +
    'Example: motoverse-firebase/\n' +
    '├── functions/              # Cloud Functions backend\n' +
    '│   ├── index.js\n' +
    '│   └── utils/\n' +
    '│       └── aiSynth.js\n' +
    '├── public/                 # Frontend for Firebase Hosting\n' +
    '│   ├── index.html\n' +
    '│   ├── app.js\n' +
    '│   └── assets/\n' +
    '│       └── avatars/\n' +
    '├── firestore.rules         # Firestore security rules\n' +
    '├── firebase.json           # Firebase config\n' +
    '└── .firebaserc             # Firebase project alias'
);
export type SummarizeCodebaseInput = z.infer<typeof SummarizeCodebaseInputSchema>;

const SummarizeCodebaseOutputSchema = z.object({
  summary: z.string().describe('A summarized overview of the codebase.'),
});
export type SummarizeCodebaseOutput = z.infer<typeof SummarizeCodebaseOutputSchema>;

export async function summarizeCodebase(input: SummarizeCodebaseInput): Promise<SummarizeCodebaseOutput> {
  return summarizeCodebaseFlow(input);
}

const summarizeCodebasePrompt = ai.definePrompt({
  name: 'summarizeCodebasePrompt',
  input: {schema: SummarizeCodebaseInputSchema},
  output: {schema: SummarizeCodebaseOutputSchema},
  prompt: `You are an AI expert in codebase summarization.
  Given the following directory structure, provide a high-level summary of the codebase's functionality and architecture.
  Directory Structure:
  {{directoryStructure}}`,
});

const summarizeCodebaseFlow = ai.defineFlow(
  {
    name: 'summarizeCodebaseFlow',
    inputSchema: SummarizeCodebaseInputSchema,
    outputSchema: SummarizeCodebaseOutputSchema,
  },
  async (input) => {
    const {output} = await summarizeCodebasePrompt({
      directoryStructure: input,
    });
    return output!;
  }
);
