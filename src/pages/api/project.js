export default async function handler(req, res) {
  const { method, query } = req;

  if (!['GET', 'POST', 'DELETE'].includes(method)) {
    return res.status(405).json({ message: '❌ Method Not Allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: '❌ Unauthorized: No token provided' });
  }

  const bddApiUrl = process.env.BDD_API.replace(/\/$/, '');

  try {
    if (method === 'GET') {
      const response = await fetch(`${bddApiUrl}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    if (method === 'POST') {
      const response = await fetch(`${bddApiUrl}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    if (method === 'DELETE') {
      const { id } = query;

      if (!id) {
        return res
          .status(400)
          .json({ message: '❌ Project ID is required for deletion' });
      }

      const response = await fetch(`${bddApiUrl}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: '❌ Server error during Project operation' });
  }
}
