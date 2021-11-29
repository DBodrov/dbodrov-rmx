export async function readPublicToken(request: Request) {
  try {
    const {protocol, host} = new URL(request.url);
    const SERVER_URL = `${protocol}//${host}`
    const response = await fetch(`${SERVER_URL}/api/getPublicToken`);
    if (!response.ok) {
      throw new Response('token lambda error', {status: 400})
    }
    const token = await response.json();
    return token;
  } catch (error) {
    console.log(error)
    throw new Response('No token', {status: 400});
  }
}