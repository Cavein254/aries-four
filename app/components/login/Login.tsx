'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: true,
    })
      .then((result: any) => {
        if (result.error) {
          console.log(result);
          setError(result.error);
        } else {
          // router.push(result.url)
          console.log('pass');
        }
      })
      .catch((e: any) => console.log(e));
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <pre>{error}</pre>
        </div>
        <div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              placeholder="aries@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="*******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
        <div>
          <Link href="/register">Register</Link>
        </div>
        <div>
          <button
            className="rounded-full px-6 py-2 border-1 border-white bg-black text-white"
            type="submit"
            onClick={() => signIn('github')}
          >
            Sign Up With Github
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
