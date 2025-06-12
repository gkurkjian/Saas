import { connect, checkUser } from '../lib/user-auth';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  try {
    await connect(); // Ensure Mongo is connected
    const user = await checkUser({ userName: username, password });

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ error: err.toString() });
  }
}
