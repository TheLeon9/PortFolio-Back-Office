import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';

import Title from '@/components/UI/Title';
import Pillar from '@/components/UI/Pillar';

export default function User() {
  const { logged } = useTheme();
  const router = useRouter();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    year: 0,
    country: '',
    city: '',
    email: '',
    description: '',
    linkedin: '',
    github: '',
  });

  useEffect(() => {
    if (!logged) {
      router.push('/');
      return;
    }

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok && data.data && data.data.length > 0) {
          setFormData(data.data[0]);
        } else {
          setError(data.message || '❌ Failed to fetch User');
        }
      } catch (err) {
        setError('❌ Failed to fetch User');
      }
    };

    fetchUser();
  }, [logged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'year' ? parseInt(value, 10) || '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/user?id=${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('✅ Profile updated successfully');
      } else {
        setError(data.message || '❌ Update failed');
      }
    } catch (err) {
      setError('❌ Error updating Profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.section_container}>
      <div className={styles.user}>
        {/* Pillar */}
        <Pillar />
        {/* Middle */}
        <div className={styles.container}>
          {/* Title */}
          <Title title="User" />

          {/* Forms */}
          <form className={styles.user_form} onSubmit={handleSubmit}>
            <div className={styles.multiple_input_cont}>
              <input
                className="input_style"
                type="text"
                name="lastName"
                placeholder="LastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                className="input_style"
                type="text"
                name="firstName"
                placeholder="FirstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <input
              className="input_style"
              type="email"
              name="email"
              placeholder="Mail"
              value={formData.email}
              onChange={handleChange}
            />
            <div className={styles.multiple_input_cont}>
              <input
                className="input_style"
                type="number"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
                min="1"
                max="120"
              />
              <input
                className="input_style"
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                className="input_style"
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <input
              className="input_style"
              type="url"
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.linkedin}
              onChange={handleChange}
            />
            <input
              className="input_style"
              type="url"
              name="github"
              placeholder="GitHub"
              value={formData.github}
              onChange={handleChange}
            />
            <textarea
              className="input_style"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            {error && (
              <div className="error_banner">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="success_banner">
                <p>{success}</p>
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
              {loading ? 'Loading...' : 'UPDATE'}
            </button>
          </form>
        </div>
        {/* Pillar */}
        <Pillar />
      </div>
    </div>
  );
}
