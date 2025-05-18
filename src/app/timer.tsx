'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const durationSchema = z.number().multipleOf(60).positive().int();
type Duration = z.infer<typeof durationSchema>;

async function clickHandler({ taskName }: { taskName: string }) {
  const notificationConfig = {
    body: `Your session [${taskName}] ended!`,
    icon: '/flash-icon.png',
  };

  if (!('Notification' in window)) {
    // Check if the browser supports notifications
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    new Notification('Finished session!', notificationConfig);
  } else if (Notification.permission !== 'denied') {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        new Notification('Finished session!', notificationConfig);
      }
    });
  }
}

export default function Timer({ duration, taskName }: { duration: Duration; taskName: string }) {
  const validatedDuration = durationSchema.parse(duration);

  const [leftDuration, setLeftDuration] = useState(validatedDuration);

  useEffect(() => {
    const a = setInterval(
      () =>
        setLeftDuration((v) => {
          if (v > 0) {
            return v - 1;
          } else {
            clearInterval(a);
            return v;
          }
        }),
      1000,
    );
    return () => clearInterval(a);
  }, []);

  return (
    <div className="mt-4 inline-block border p-4">
      <div className="inline-block rounded-md bg-red-300 p-2">
        <span className="font-bold">
          🍅{' '}
          {`${Math.floor(leftDuration / 60)
            .toString()
            .padStart(2, '0')}:${(leftDuration % 60).toString().padStart(2, '0')}`}
        </span>
      </div>
      <p>Focus on: {taskName}</p>
      <button
        onClick={() => clickHandler({ taskName })}
        className="mt-4 cursor-pointer border bg-gray-700 p-2 text-xs text-white hover:bg-gray-900"
      >
        Finish Session
      </button>
    </div>
  );
}
