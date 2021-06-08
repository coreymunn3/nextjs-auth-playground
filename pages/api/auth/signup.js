import { connectDb } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    // validate request
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        error: 'Invalid Input - password should be at least 7 characters',
      });
      return;
    }
    const client = await connectDb();
    const db = client.db();

    // check if user exists
    const user = await db.collection('users').findOne({ email });
    if (user) {
      res.status(422).json({ error: 'User Already Exists!' });
      client.close();
      return;
    }

    const result = await db.collection('users').insertOne({
      email,
      password: await hashPassword(password),
    });
    console.log(result.ops);

    res.status(201).json({ message: 'Created User' });
    client.close();
  }
};

export default handler;
