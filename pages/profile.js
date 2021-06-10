import UserProfile from '../components/profile/user-profile';
import { getSession } from 'next-auth/client';

function ProfilePage() {
  return <UserProfile />;
}

export default ProfilePage;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  // else, user is logged in
  return {
    props: { session },
  };
}
