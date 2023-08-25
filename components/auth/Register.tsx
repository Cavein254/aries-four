'use client';

import fetcher from '@/utils/fetcher';
import Link from 'next/link';
import { useState } from 'react';

const Register = () => {
  // const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleRegister = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    fetcher('/api/auth/register', userData);
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <pre>{error}</pre>
        </div>
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
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
            <button type="submit">Register</button>
          </div>
        </div>
        <div>
          <Link href="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
