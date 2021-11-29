import fetch from 'node-fetch';

export async function readPublicToken(amount: FormDataEntryValue) {
  try {
    
    const response = await fetch('http://localhost:3000/api/getPublicToken');
    const token = await response.json();
    
    console.log('try readPubToken', token)
    console.log(token)
    return token;
  } catch (error) {
    throw new Response('No token', {status: 500});
  }
}