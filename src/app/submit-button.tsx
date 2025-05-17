'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer border bg-green-400 p-2 hover:bg-green-500 disabled:bg-gray-400"
      >
        Submit
      </button>
      <p>{pending ? 'Status: Loading... ' : ''}</p>
    </div>
  );
}
