'use client';

import { createSession } from '@/app/actions';
import SubmitButton from './submit-button';
import { useFormState } from 'react-dom';
import Timer from './timer';

export default function Home() {
  const [state, formAction] = useFormState(createSession, null);

  return (
    <div>
      <form action={formAction} className="flex w-[300px] flex-col justify-between gap-y-4">
        <div className="flex justify-between">
          <label htmlFor="timer">Timer (sec):</label>
          <input type="number" id="timer" name="timer" className="border" />
        </div>

        <div className="flex justify-between">
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" id="taskName" name="taskName" className="border" />
        </div>
        <p>{state?.message}</p>
        <SubmitButton />
      </form>
      {state?.data && <Timer duration={state.data.timer} taskName={state.data.taskName} />}
    </div>
  );
}
