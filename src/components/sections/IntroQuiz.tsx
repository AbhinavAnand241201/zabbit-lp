"use client";

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Rocket, Loader, Award, Sparkles } from 'lucide-react';

import { evaluateQuiz, EvaluateQuizInput } from '@/ai/flows/quiz-flow';
import { quizQuestions } from '@/lib/quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const apkLink = "https://drive.google.com/file/d/1FOLZFftWKZ4sjBxoPZUKlMMOicOs31v3/view?usp=sharing";

const answersSchema = z.object({
  answers: z.array(z.string()).refine(val => val.length === quizQuestions.length, {
    message: 'Please answer all questions.',
  }),
});

type AnswersForm = z.infer<typeof answersSchema>;

export function IntroQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<AnswersForm>({
    resolver: zodResolver(answersSchema),
    defaultValues: {
      answers: Array(quizQuestions.length).fill(''),
    },
  });

  const onSubmit = async (data: AnswersForm) => {
    setIsLoading(true);
    try {
      const result = await evaluateQuiz(data as EvaluateQuizInput);
      setScore(result.score);
    } catch (error) {
      console.error('Failed to evaluate quiz:', error);
      toast({
        title: 'Error',
        description: 'Could not evaluate the quiz. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    const isAnswered = form.getValues(`answers.${currentQuestion}`) !== '';
    if (!isAnswered) {
      form.setError(`answers.${currentQuestion}`, { type: 'manual', message: 'Please select an answer.' });
      return;
    }
    form.clearErrors(`answers.${currentQuestion}`);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await form.handleSubmit(onSubmit)();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  if (score !== null) {
    return (
      <section id="intro-quiz" className="py-24 sm:py-32">
        <div className="container mx-auto max-w-2xl px-4 md:px-6">
          <Card className="bg-secondary/50 border-primary/20 animate-fade-in-up">
            <CardHeader className="text-center">
              <Award className="mx-auto h-16 w-16 text-primary animate-bounce-sm" />
              <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg">You did a great job!</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-5xl font-bold gradient-text">
                {score}/{quizQuestions.length}
              </p>
              <p className="text-muted-foreground">
                You're a star! Ready to unlock more knowledge? Download our app to continue your learning adventure.
              </p>
              <Button asChild size="lg" className="rounded-full px-10 py-7 text-lg font-bold transition-all hover:shadow-lg hover:shadow-accent/50 hover:brightness-110 hover:scale-105 gradient-background text-primary-foreground group">
                <a href={apkLink} target="_blank" rel="noopener noreferrer">
                  Download the App
                  <Sparkles className="w-5 h-5 ml-2 transition-transform duration-500 group-hover:rotate-180" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="intro-quiz" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-2xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
          <Rocket className="w-16 h-16 text-primary animate-bounce-sm" />
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Ready for a Challenge?
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            Test your knowledge with this quick and fun quiz!
          </p>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="bg-secondary/50 border-primary/20 overflow-hidden" style={{ minHeight: '280px'}}>
              <CardContent className="p-6">
                <div className="relative">
                  {quizQuestions.map((q, index) => (
                    <div
                      key={q.id}
                      className={cn(
                        'transition-all duration-500 absolute w-full',
                        index === currentQuestion ? 'opacity-100 translate-x-0' : 'opacity-0',
                        index > currentQuestion ? 'translate-x-full' : '-translate-x-full'
                      )}
                      style={{
                        visibility: index === currentQuestion ? 'visible' : 'hidden'
                      }}
                    >
                      <FormField
                        control={form.control}
                        name={`answers.${index}`}
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <FormLabel className="text-xl font-bold text-center block">
                              {q.question}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
                              >
                                {q.options.map((option) => (
                                  <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                       <RadioGroupItem value={option} id={`${q.id}-${option}`} className="w-5 h-5" />
                                    </FormControl>
                                    <Label htmlFor={`${q.id}-${option}`} className="text-lg font-normal">
                                      {option}
                                    </Label>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                             <FormMessage className="text-center pt-2" />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </div>
              <Button type="button" onClick={handleNext} disabled={isLoading} className="gradient-background text-primary-foreground">
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                {currentQuestion < quizQuestions.length - 1 ? 'Next' : 'Finish Quiz'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
