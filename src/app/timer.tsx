'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const durationSchema = z.number().multipleOf(60).positive().int();
type Duration = z.infer<typeof durationSchema>;

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
    </div>
  );
}
