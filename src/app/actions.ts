'use server';

import { z } from 'zod';

const schema = z
  .object({
    timer: z.number().int().positive(),
    taskName: z.string(),
  })
  .strict();

type NewSessionData = z.infer<typeof schema>;

type CreateSessionFormState = {
  message: string;
  data?: NewSessionData;
} | null;

export async function createSession(currentState: CreateSessionFormState, formData: FormData) {
  //   Learned: extract pair entries from FormData - https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations#forms
  const { timer, taskName } = Object.fromEntries(formData);

  // Learned: pattern check and handle with safeParse - https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
  const validatedFields = schema.safeParse({ timer: +timer, taskName });

  // Temporary: mock delay processing time
  await new Promise((res) => setTimeout(res, 2000));

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      message: JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  return {
    message: 'Successfully created a new section.',
    data: validatedFields.data,
  };
}
