import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../lib/auth';
import { connectDb } from '../../../lib/db';

// returns a handler function
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        // write your own auth logic here
        const client = await connectDb();
        const user = await client.db().collection('users').findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('No User Found');
        }
        // verify the password
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error('Incorrect Password');
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
