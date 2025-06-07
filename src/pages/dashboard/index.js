import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';

import Title from '@/components/UI/Title';
import Pillar from '@/components/UI/Pillar';

export default function Dashboard() {
  const { logged } = useTheme();
  const router = useRouter();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!logged) {
      router.replace('/');
      return;
    }
  }, [logged]);

  const handleGenerateConstants = async () => {
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/constants', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || '❌ Failed to load Constants Data');
        return;
      }

      const saveResponse = await fetch('/api/generate-constants-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const saveResult = await saveResponse.json();

      if (!saveResponse.ok) {
        console.error('❌ Backend Error:', saveResult);
        setError(saveResult?.error || '❌ Failed to write the constants file.');
        return;
      }

      setSuccess('✅ Constants fetched and file generated successfully!');
    } catch (err) {
      setError('❌ An unexpected error occurred while generating the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.section_container}>
      <div className={styles.dashboard}>
        {/* Pillar */}
        <Pillar />
        {/* Middle */}
        <div className={styles.container}>
          {/* Title */}
          <Title title="DashBaord" />

          {/* Forms */}
          <div className={styles.constants_form}>
            <p className="p_white p__medium">
              By clicking the "Next" button, you will :
            </p>
            <ul className={styles.list_text}>
              <li className={styles.li_text}>
                Automatically generate a{' '}
                <span className={styles.span_text}>
                  <strong>
                    <em>`constants-generated.js`</em>
                  </strong>
                </span>{' '}
                file in your front-end project
              </li>
              <li className={styles.li_text}>
                File path :{' '}
                <span className={styles.span_text}>
                  <strong>
                    <em>`src/constants/`</em>
                  </strong>
                </span>
              </li>
              <li className={styles.li_text}>
                Once generated, please{' '}
                <span className={styles.span_text}>
                  <strong>
                    <em>`git push`</em>
                  </strong>
                </span>{' '}
                your front-end project to trigger the Vercel build and deploy
                the updated data to the live website
              </li>
            </ul>

            <button
              className="input_button"
              onClick={handleGenerateConstants}
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Loading...' : 'GENERATE FILE'}
            </button>

            {success && (
              <div className="success_banner">
                <p>{success}</p>
              </div>
            )}
            {error && (
              <div className="error_banner">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Pillar */}
        <Pillar />
      </div>
    </div>
  );
}
