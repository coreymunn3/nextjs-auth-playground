import { getSession } from 'next-auth/client';
import { connectDb } from '../../../lib/db';
import { verifyPassword, hashPassword } from '../../../lib/auth';

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return;
  }
  // verify req is coming from authed user
  const session = await getSession({ req });
  console.log(session);

  // not authenticated
  if (!session) {
    res.status(401).json({ error: 'You are not logged in' });
    return;
  }

  // authenticated
  const client = await connectDb();
  const db = client.db();

  const user = await db
    .collection('users')
    .findOne({ email: session.user.email });
  console.log(user);
  // user does not exist, cannot change pw
  if (!user) {
    client.close();
    res.status(404).json({ error: 'User Not Found' });
    return;
  }

  // user does exist, do passwords match?
  const { oldPassword, newPassword } = req.body;
  const isValid = await verifyPassword(oldPassword, user.password);
  console.log(isValid);

  // passwords don't match
  if (!isValid) {
    client.close();
    res.status(403).json({ error: 'Old Password is Not Correct' });
    return;
  }

  // finally, passwords match, change the password
  const hashedPassword = await hashPassword(newPassword);
  const result = await db.collection('users').updateOne(
    { email: session.user.email },
    {
      $set: { password: hashedPassword },
    }
  );

  client.close();
  res
    .status(200)
    .json({ message: 'Password Updated Successfully', user: result.ops });
};

export default handler;
