export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'PUT') {
    return res.status(405).json({ message: '❌ Method Not Allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: '❌ Unauthorized: No Token provided' });
  }

  const bddApiUrl = process.env.BDD_API.replace(/\/$/, '');

  if (req.method === 'GET') {
    try {
      const response = await fetch(`${bddApiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (error) {
      return res.status(500).json({ message: '❌ Failed to fetch Users' });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: '❌ User ID is required',
      });
    }

    try {
      const response = await fetch(`${bddApiUrl}/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (error) {
      return res.status(500).json({ message: '❌ Failed to update User' });
    }
  }
}
