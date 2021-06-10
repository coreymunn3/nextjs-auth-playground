import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
// *** for client side session auth checking...
// *** don't need because we're doing serverside in profile
// import { getSession } from 'next-auth/client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

function UserProfile() {
  // *** for client side session auth checking...
  // *** don't need because we're doing serverside in profile
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       router.push('/auth');
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p style={{ textAlign: 'center' }}>Loading...</p>;
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
