export async function readPublicToken(request: Request) {
  try {
    const {protocol, host} = new URL(request.url);
    const SERVER_URL = `${protocol}//${host}`
    console.log('SERVER_URL :', SERVER_URL)
    const response = await fetch(`${SERVER_URL}/api/getPublicToken`);
    if (! response.ok) {
      throw new Response('token lambda error', {status: 400})
    }
    console.log('api response', response)
    const token = await response.json();
    
    console.log('try readPubToken', token.data)
    //console.log(token)
    return token;
  } catch (error) {
    console.log(error)
    throw new Response('No token', {status: 500});
  }
}