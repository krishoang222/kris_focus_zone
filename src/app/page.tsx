'use client';

import { useFormStatus } from 'react-dom';
import { createSession } from '@/app/actions';

export default function Home() {
  return (
    <div>
      <form action={createSession}>
        <div>
          <label htmlFor="timer">Timer</label>
          <input type="number" id="timer" name="timer" className="border" />
        </div>

        <div>
          <label htmlFor="taskName">Task Name</label>
          <input type="text" id="taskName" name="taskName" className="border" />
        </div>
        <PendingMessage />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function PendingMessage() {
  const { pending } = useFormStatus();
  console.log(pending);

  return <p>{pending ? 'Loading.. ' : 'Done'}</p>;
}
