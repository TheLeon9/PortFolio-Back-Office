import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';

import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';

import Image from 'next/image';
import Logo from 'p/img/logo/logo_fm_white.svg';

export default function Layout({ children }) {

  const router = useRouter();
  const { logged, isLogged } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    isLogged(false);
    router.push('/');
  };

  return (
    <div className={styles.global_container}>
      {/* Header */}
      <div className={styles.section_top}>
        <Image
          src={Logo}
          width={80}
          height={80}
          alt="Logo FM"
          className={styles.logo}
        />
      </div>

      {/* Nav Bar */}
      {logged && (
        <div className={styles.section_nav}>
          {/* Navigation Bar */}
          <nav className={styles.navbar}>
            <Link href="/user" className={styles.nav_link}>
              👤 User
            </Link>
            <Link href="/projects" className={styles.nav_link}>
              📁 Projects
            </Link>
            <Link href="/skills" className={styles.nav_link}>
              🛠️ Skills
            </Link>
            <Link href="/dashboard" className={styles.nav_link}>
              🏠 Dashboard
            </Link>
            <button onClick={handleLogout} className="input_button">
              🚪 Logout
            </button>
          </nav>
        </div>
      )}

      {/* Main / Children */}
      {React.cloneElement(children)}
    </div>
  );
}
