'use server';

/**
 * @fileOverview This file contains a Genkit flow for evaluating a quiz.
 *
 * - evaluateQuiz - A function that takes quiz answers and returns a score.
 * - EvaluateQuizInput - The input type for the evaluateQuiz function.
 * - EvaluateQuizOutput - The return type for the evaluateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { quizQuestions } from '@/lib/quiz';

const EvaluateQuizInputSchema = z.object({
  answers: z.array(z.string()).describe('An array of answers provided by the user.'),
});
export type EvaluateQuizInput = z.infer<typeof EvaluateQuizInputSchema>;

const EvaluateQuizOutputSchema = z.object({
  score: z.number().describe('The total number of correct answers.'),
});
export type EvaluateQuizOutput = z.infer<typeof EvaluateQuizOutputSchema>;

export async function evaluateQuiz(
  input: EvaluateQuizInput
): Promise<EvaluateQuizOutput> {
  return evaluateQuizFlow(input);
}

const evaluateQuizFlow = ai.defineFlow(
  {
    name: 'evaluateQuizFlow',
    inputSchema: EvaluateQuizInputSchema,
    outputSchema: EvaluateQuizOutputSchema,
  },
  async (input) => {
    let score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
      if (input.answers[i] === quizQuestions[i].answer) {
        score++;
      }
    }
    return { score };
  }
);
