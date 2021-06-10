import { useRef } from 'react';
import classes from './profile-form.module.css';
import axios from 'axios';

function ProfileForm() {
  const oldRef = useRef();
  const newRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch('/api/user/change-password', {
        oldPassword: oldRef.current.value,
        newPassword: newRef.current.value,
      });
      console.log(data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newRef} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
