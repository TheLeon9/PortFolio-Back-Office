export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const authApiUrl = `${process.env.AUTH_API.replace(/\/$/, '')}/login`;

    const authResponse = await fetch(authApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const text = await authResponse.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res
        .status(502)
        .json({ message: 'Invalid response from Auth Service' });
    }

    if (!authResponse.ok) {
      return res
        .status(authResponse.status)
        .json({ message: data.message || 'Login failed' });
    }

    return res.status(200).json({ token: data.token, message: data.message });
  } catch (error) {
    console.error('Auth connection error:', error.code || error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({ message: 'Auth Service Unavailable' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
