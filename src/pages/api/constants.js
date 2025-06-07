export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '❌ Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: '❌ Unauthorized: No Token provided' });
  }

  const bddApiUrl = process.env.BDD_API.replace(/\/$/, '');

  try {
    const response = await fetch(`${bddApiUrl}/constants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res
      .status(500)
      .json({ error: '❌ Error fetching Constants Data from backend' });
  }
}
