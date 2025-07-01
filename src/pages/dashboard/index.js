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

  const [metricsList, setMetricsList] = useState([]);

  useEffect(() => {
    if (!logged) {
      router.replace('/');
      return;
    }

    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/metric', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setMetricsList(data.data);
        } else {
          setError(data.message || '❌ Failed to load Metrics');
        }
      } catch (err) {
        setError('❌ Error loading Metrics');
      }
    };

    fetchMetrics();
  }, [logged]);

  return (
    <div className={styles.section_container}>
      <div className={styles.dashboard}>
        {/* Pillar */}
        <Pillar />
        {/* Middle */}
        <div className={styles.container}>
          {/* Title */}
          <Title title="DashBaord" />

          {/* Metrics List */}
          <div className={styles.metrics_section}>
            {error && (
              <div className="error_banner">
                <p>{error}</p>
              </div>
            )}
            <ul className={styles.metrics_list}>
              {Object.entries(metricsList).map(([label, value]) => (
                <li key={label}>
                  <span className={styles.metric_label}>{label}</span>
                  <span className={styles.metric_separator}>||</span>
                  <span className={styles.metric_value}>
                    {Array.isArray(value)
                      ? value.join(', ')
                      : typeof value === 'object' && value !== null
                      ? Object.entries(value)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' | ')
                      : value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pillar */}
        <Pillar />
      </div>
    </div>
  );
}
