'use server';

/**
 * @fileOverview This file contains a Genkit flow for automatically adjusting font sizes and spacing based on device metrics.
 *
 * - adjustTypography - A function that takes device metrics and content as input and returns adjusted styles.
 * - AdjustTypographyInput - The input type for the adjustTypography function.
 * - AdjustTypographyOutput - The return type for the adjustTypography function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustTypographyInputSchema = z.object({
  deviceWidth: z.number().describe('The width of the device in pixels.'),
  deviceHeight: z.number().describe('The height of the device in pixels.'),
  content: z.string().describe('The text content to be styled.'),
  baseFontSize: z.number().describe('The base font size for the text content.'),
  baseLineHeight: z.number().describe('The base line height for the text content.'),
});
export type AdjustTypographyInput = z.infer<typeof AdjustTypographyInputSchema>;

const AdjustTypographyOutputSchema = z.object({
  fontSize: z.number().describe('The adjusted font size for the text content.'),
  lineHeight: z.number().describe('The adjusted line height for the text content.'),
});
export type AdjustTypographyOutput = z.infer<typeof AdjustTypographyOutputSchema>;

export async function adjustTypography(input: AdjustTypographyInput): Promise<AdjustTypographyOutput> {
  return adjustTypographyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustTypographyPrompt',
  input: {schema: AdjustTypographyInputSchema},
  output: {schema: AdjustTypographyOutputSchema},
  prompt: `You are an expert UI/UX designer specializing in responsive typography.

You will receive the device width, device height, content, base font size, and base line height as input.
Based on these inputs, you will output adjusted font size and line height to optimize the readability of the content on the given device.

Consider these factors when determining the adjusted values:
- Device size: Smaller devices require smaller font sizes and line heights to avoid text overflow.
- Content length: Longer content may require slightly smaller font sizes to fit within the screen.
- Base values: Adjust the font size and line height relative to the provided base values.

Device Width: {{{deviceWidth}}}px
Device Height: {{{deviceHeight}}}px
Content: {{{content}}}
Base Font Size: {{{baseFontSize}}}px
Base Line Height: {{{baseLineHeight}}}px

Output the adjusted font size and line height as a JSON object with the keys "fontSize" and "lineHeight".
{
  "fontSize": <adjusted font size in pixels>,
  "lineHeight": <adjusted line height in pixels>
}
`,
});

const adjustTypographyFlow = ai.defineFlow(
  {
    name: 'adjustTypographyFlow',
    inputSchema: AdjustTypographyInputSchema,
    outputSchema: AdjustTypographyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
