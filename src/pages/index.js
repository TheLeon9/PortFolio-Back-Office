import React, { useState } from 'react';
import styles from '@/styles/login/index.module.scss';
import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';

import Image from 'next/image';
import Google_Logo from 'p/img/deco/google_logo.svg';

import Pillar from '@/components/UI/Pillar';
import Title from '@/components/UI/Title';

export default function Login() {
  const router = useRouter();
  const { isLogged } = useTheme();

  const [mail, setMail] = useState('f@f.f');
  const [password, setPassword] = useState('123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: mail, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || '❌ Login failed');
        return;
      }

      localStorage.setItem('token', result.token);
      isLogged(true);
      router.push('/user');
    } catch (err) {
      setError('❌ An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.section_container}>
      <div className={styles.login}>
        <Pillar />

        <div className={styles.container}>
          <Title title="LOGIN" />
          <form className={styles.login_form} onSubmit={handleSubmit}>
            <input
              className="input_style"
              type="email"
              name="mail"
              placeholder="Mail"
              title="Please enter a valid Mail address (e.g., example@mail.com)"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              required
            />
            <input
              className="input_style"
              type="password"
              name="password"
              placeholder="PassWord"
              title="Password must be at least 8 characters long, include one uppercase letter, and one number."
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {error && (
              <div className="error_banner">
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="input_button"
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Connecting...' : 'START'}
            </button>
          </form>

          <div className={styles.google_login}>
            <p>OU</p>
            <button className={styles.google_button}>
              <Image
                src={Google_Logo}
                width={24}
                height={24}
                alt="Google_Logo"
              />
              Continue with Google
            </button>
          </div>
        </div>

        <Pillar />
      </div>
    </div>
  );
}
