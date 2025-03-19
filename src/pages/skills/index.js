import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';
import Title from '@/components/UI/Title';
import Pillar from '@/components/UI/Pillar';

export default function Skills() {
  const { logged } = useTheme();
  const router = useRouter();

  const [skill, setSkill] = useState('');
  const [skillsList, setSkillsList] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!logged) {
      router.replace('/');
    }
  }, [logged]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skill.trim() === '') return;
    setSkillsList([...skillsList, skill]);
    setSkill('');
  };

  const handleRemoveSkill = (index) => {
    const updatedList = skillsList.filter((_, i) => i !== index);
    setSkillsList(updatedList);
  };

  return (
    <div className={styles.section_container}>
      <div className={styles.skills}>
        {/* Pillar */}
        <Pillar />
        {/* Middle */}
        <div className={styles.container}>
          {/* Title */}
          <Title title="Skills" />

          {/* Forms */}
          <form className={styles.skills_form} onSubmit={handleAddSkill}>
            <input
              className="input_style"
              type="text"
              placeholder="Add a skill..."
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              required
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
              ADD
            </button>
          </form>
          
          {/* Skills List */}
          <ul className={styles.skills_list}>
            {skillsList.map((skill, index) => (
              <li key={index}>
                {skill}
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="delete_button"
                >
                  DELETE
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Pillar */}
        <Pillar />
      </div>
    </div>
  );
}
