'use client';
import { useEffect, useState } from 'react';

// TODO: make use of schema from actions to use in this arguments (zod)
export default function Timer({ duration, taskName }: { duration: number; taskName: string }) {
  const [leftDuration, setLeftDuration] = useState(duration);

  useEffect(() => {
    const a = setInterval(
      () =>
        setLeftDuration((v) => {
          if (v > 0) {
            console.log('minus', v);
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
        {/* TODO: render input (amount of time) to hh:mm:ss format UI */}
        <span className="font-bold">🍅 0:{leftDuration}</span>
      </div>
      <p>Focus on: {taskName}</p>
    </div>
  );
}
