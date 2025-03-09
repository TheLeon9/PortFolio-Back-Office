import React from 'react';
import styles from '@/styles/login/index.module.scss';
import { useTheme } from '@/context/ThemeContext.js';

import Image from 'next/image';
import Deco_Image from 'p/img/deco/title_image.svg';
import Google_Logo from 'p/img/deco/google_logo.svg';

export default function Login() {
  return (
    <div className={styles.section_container}>
      <div className={styles.login}>
        {/* Pillar */}
        <div className={styles.pillar}>
          <div className={styles.section_image}>
            <Image
              src={Deco_Image}
              width={40}
              height={40}
              alt="Decoration Image"
              className={styles.deco_image}
            />
          </div>
          <div className={styles.deco_line}></div>
        </div>

        {/* Middle */}
        <div className={styles.container}>
          <div className={styles.section_title}>
            <h1>LOGIN</h1>
          </div>
          {/* Formulaire de connexion */}
          <form className={styles.login_form}>
            <input
              className="input_style"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="input_style"
              type="password"
              placeholder="Mot de passe"
              required
            />
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
        <div className={styles.pillar}>
          <div className={styles.section_image}>
            <Image
              src={Deco_Image}
              width={40}
              height={40}
              alt="Decoration Image"
              className={styles.deco_image}
            />
          </div>
          <div className={styles.deco_line}></div>
        </div>
      </div>
    </div>
  );
}
