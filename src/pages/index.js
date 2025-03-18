import React, { useState, useEffect } from 'react';
import styles from '@/styles/login/index.module.scss';
import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';

import Image from 'next/image';
import Google_Logo from 'p/img/deco/google_logo.svg';

import Pillar from '@/components/UI/Pillar';
import Title from '@/components/UI/Title';

export default function Login() {
  const router = useRouter();
  const { logged, isLogged } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (logged) {
      router.replace('/dashboard');
    }
  }, [logged]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Identifiants valides en dur
    const validEmail = 'f@f.f';
    const validPassword = '123';

    if (email === validEmail && password === validPassword) {
      isLogged(true); // Mise à jour du contexte (Connexion réussie)
      router.push('/dashboard');
    } else {
      setError('Invalid email or password.');
    }

    // try {
    //   const response = await fetch('http://localhost:5000/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (!response.ok) throw new Error('Invalid credentials');

    //   const data = await response.json();
    //   isLogged(true); // Mise à jour du contexte (Connexion réussie)
    //   console.log('Logged in successfully:', data);
    // } catch (err) {
    //   setError('Invalid email or password.');
    // }
  };

  return (
    <div className={styles.section_container}>
      <div className={styles.login}>
        {/* Pillar */}
        <Pillar />

        {/* Middle */}
        <div className={styles.container}>
          {/* Title */}
          <Title title="LOGIN" />
          {/* Formulaire de connexion */}
          <form className={styles.login_form} onSubmit={handleSubmit}>
            <input
              className="input_style"
              type="email"
              placeholder="Email"
              // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address (e.g., example@mail.com)"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input_style"
              type="password"
              placeholder="Mot de passe"
              // pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
              title="Password must be at least 8 characters long, include one uppercase letter, and one number."
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <div className="error_banner">
                <p>{error}</p>
              </div>
            )}
            <button type="submit" className="input_button">
              START
            </button>
          </form>

          {/* Connexion Google */}
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

        {/* Pillar */}
        <Pillar />
      </div>
    </div>
  );
}
