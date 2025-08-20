'use server';

/**
 * @fileOverview This file contains a Genkit flow for evaluating a quiz.
 *
 * - evaluateQuiz - A function that takes quiz answers and returns a score.
 * - EvaluateQuizInput - The input type for the evaluateQuiz function.
 * - EvaluateQuizOutput - The return type for the evaluateQuiz function.
 * - quizQuestions - An array of quiz questions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const quizQuestions = [
    {
      id: 1,
      question: 'What is the capital of India?',
      options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'],
      answer: 'New Delhi',
    },
    {
      id: 2,
      question: 'Which river is known as the "Ganga" in India?',
      options: ['Yamuna', 'Brahmaputra', 'Ganges', 'Godavari'],
      answer: 'Ganges',
    },
    {
      id: 3,
      question: 'What is the national animal of India?',
      options: ['Lion', 'Tiger', 'Elephant', 'Leopard'],
      answer: 'Tiger',
    },
    {
      id: 4,
      question: 'Which festival is known as the "Festival of Lights" in India?',
      options: ['Holi', 'Diwali', 'Eid', 'Christmas'],
      answer: 'Diwali',
    },
    {
      id: 5,
      question: 'The Taj Mahal is located in which Indian city?',
      options: ['Delhi', 'Jaipur', 'Agra', 'Mumbai'],
      answer: 'Agra',
    },
    {
      id: 6,
      question: 'What is the national currency of India?',
      options: ['Dollar', 'Euro', 'Rupee', 'Yen'],
      answer: 'Rupee',
    },
    {
      id: 7,
      question: 'Which of these is a famous Indian dish?',
      options: ['Pizza', 'Sushi', 'Biryani', 'Pasta'],
      answer: 'Biryani',
    },
    {
      id: 8,
      question: 'Who is known as the "Father of the Nation" in India?',
      options: ['Jawaharlal Nehru', 'Sardar Patel', 'Mahatma Gandhi', 'Subhas Chandra Bose'],
      answer: 'Mahatma Gandhi',
    },
    {
      id: 9,
      question: 'What is the national sport of India?',
      options: ['Cricket', 'Field Hockey', 'Football', 'Kabaddi'],
      answer: 'Field Hockey',
    },
    {
      id: 10,
      question: 'Which is the most populous state in India?',
      options: ['Maharashtra', 'Bihar', 'West Bengal', 'Uttar Pradesh'],
      answer: 'Uttar Pradesh',
    },
];

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
