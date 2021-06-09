import { useState, useRef } from 'react';
import classes from './auth-form.module.css';
import axios from 'axios';
import { signIn } from 'next-auth/client';

async function createUser(email, password) {
  try {
    const { data } = await axios.post('/api/auth/signup', {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.error);
  }
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(result);
    } else {
      try {
        const newUser = await createUser(
          emailRef.current.value,
          passwordRef.current.value
        );
        console.log(newUser);
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='submit'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
