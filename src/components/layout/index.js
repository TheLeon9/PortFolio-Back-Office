import React from 'react';
import styles from './index.module.scss';
import { useTheme } from '@/context/ThemeContext.js';
import Image from 'next/image';
import Logo from 'p/img/logo/logo_fm_white.svg';

export default function Layout({ children }) {
  const { logged } = useTheme();

  return (
    <div className={styles.global_container}>
      {/* Header */}
      <div className={styles.section_top}>
        <Image src={Logo} width={80} height={80} alt="Logo FM" className={styles.logo} />
      </div>

      {/* Main */}
      <div className={styles.section_mid}>
        {/* Children */}
        {React.cloneElement(children)}
      </div>

      {/* Footer */}
      {logged && (
        <div className={styles.section_bot}>
          {/* Navigation Bar */}
          <p>Section uniquement visible quand l'utilisateur est connecté.</p>
        </div>
      )}
    </div>
  );
}
