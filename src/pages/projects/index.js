import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';
import Title from '@/components/UI/Title';
import Pillar from '@/components/UI/Pillar';

export default function Projects() {
  const { logged } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!logged) {
      router.replace('/');
    }
  }, [logged]);

  return (
    <div className={styles.section_container}>
      <div className={styles.projects}>
        {/* Pillar */}
        <Pillar />
        {/* Middle */}
        <div className={styles.container}>
          {/* Title */}
          <Title title="Projects" />;
        </div>
        {/* Pillar */}
        <Pillar />
      </div>
    </div>
  );
}
