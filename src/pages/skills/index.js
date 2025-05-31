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
      return;
    }

    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/skill', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setSkillsList(data.data);
        } else {
          setError(data.message || '❌ Failed to load Skills');
        }
      } catch (err) {
        setError('❌ Error loading Skills');
      }
    };

    fetchSkills();
  }, [logged]);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (skill.trim() === '') return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/skill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: skill }),
      });

      const data = await response.json();

      if (response.ok) {
        setSkillsList([...skillsList, data.data]);
        setSkill('');
        setSuccess('✅ Skill added successfully');
      } else {
        setError(data.message || '❌ Failed to add Skill');
      }
    } catch (err) {
      setError('❌ Server error when adding Skill');
    }
  };

  const handleRemoveSkill = async (index) => {
    const skillToDelete = skillsList[index];

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/skill?id=${skillToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        const updatedList = skillsList.filter((_, i) => i !== index);
        setSkillsList(updatedList);
        setSuccess('✅ Skill deleted');
      } else {
        setError(data.message || '❌ Failed to delete Skill');
      }
    } catch (err) {
      setError('❌ Server error when deleting Skill');
    }
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
              <li key={skill.id}>
                {skill.value}
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
