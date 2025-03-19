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

  const [formData, setFormData] = useState({
    lastname: 'Moracchini',
    firstname: 'Florian',
    age: '22',
    mail: 'florian.moracchini09@gmail.com',
    description: 'Développeur / Designer',
    linkedin: 'https://www.linkedin.com/in/florian-moracchini/',
    github: 'https://github.com/TheLeon9',
    city: 'Paris',
    country: 'France',
  });

  useEffect(() => {
    if (!logged) {
      router.replace('/');
    }
  }, [logged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Ici, tu peux envoyer les données à ton API
    if (formData.firstname != '') {
      setSuccess('Updating the profile was a Succes');
    } else {
      setError('Error updating your profil');
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
                name="lastname"
                placeholder="LastName"
                value={formData.lastname}
                onChange={handleChange}
              />
              <input
                className="input_style"
                type="text"
                name="firstname"
                placeholder="FirstName"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <input
              className="input_style"
              type="email"
              name="mail"
              placeholder="Mail"
              value={formData.mail}
              onChange={handleChange}
            />
            <div className={styles.multiple_input_cont}>
              <input
                className="input_style"
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
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
            <button type="submit" className="input_button">
              UPDATE
            </button>
          </form>
        </div>
        {/* Pillar */}
        <Pillar />
      </div>
    </div>
  );
}
