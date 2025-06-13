import { connect } from '../../../lib/user-auth'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const { fullName, userName, password } = req.body
  console.log('REGISTER BODY:', req.body)

  if (!userName || !password || !fullName) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const User = await connect()

    const existingUser = await User.findOne({ userName })
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      role: 'user',
    })

    await newUser.save()

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(201).json({ token })
  } catch (err) {
    console.error('REGISTER ERROR:', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
