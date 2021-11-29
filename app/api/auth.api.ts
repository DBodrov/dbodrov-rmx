export async function readPublicToken(request: Request) {
  try {
    const {protocol, host} = new URL(request.url);
    const SERVER_URL = `${protocol}//${host}`
    console.log('SERVER_URL :', SERVER_URL)
    const response = await fetch(`${SERVER_URL}/api/getPublicToken`);
    const token = await response.json();
    
    console.log('try readPubToken', token)
    console.log(token)
    return token;
  } catch (error) {
    throw new Response('No token', {status: 500});
  }
}