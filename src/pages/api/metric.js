export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: '❌ Method Not Allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: '❌ Unauthorized: No token provided' });
  }

  const bddApiUrl = process.env.METRICS_API.replace(/\/$/, '');

  try {
    const response = await fetch(`${bddApiUrl}/metrics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: '❌ Server error during Metrics fetch' });
  }
}
