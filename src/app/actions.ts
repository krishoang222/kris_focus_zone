'use server';

export async function createSession() {
  await new Promise((res) => setTimeout(res, 2000));
  console.log('create SEssion in server');
}
