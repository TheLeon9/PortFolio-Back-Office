import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';
import Title from '@/components/UI/Title';
import Pillar from '@/components/UI/Pillar';

export default function Projects() {
  const { logged } = useTheme();
  const router = useRouter();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    number: '',
    title: '',
    description: '',
    url: '',
    highlights: ['', '', '', '', ''],
  });

  useEffect(() => {
    if (!logged) {
      router.replace('/');
    }
  }, [logged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...form.highlights];
    newHighlights[index] = value;
    setForm({ ...form, highlights: newHighlights });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!form.title) {
      setError('Title and URL are required.');
      return;
    }
    setProjects([...projects, form]);
    setForm({
      number: '',
      title: '',
      description: '',
      url: '',
      highlights: ['', '', '', '', ''],
    });
    setSuccess('Project added successfully!');
    setError('');
  };

  const handleDeleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.section_container}>
      <div className={styles.projects}>
        {/* Pillar */}
        <Pillar />
        {/* Middle */}
        <div className={styles.container}>
          {/* Title */}
          <Title title="Projects" />

          {/* Forms */}
          <form className={styles.projects_form} onSubmit={handleAddProject}>
            <input
              className="input_style"
              type="number"
              name="number"
              placeholder="Project Number"
              value={form.number}
              onChange={handleChange}
            />
            <input
              className="input_style"
              type="text"
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              className="input_style"
              name="description"
              placeholder="Project Description"
              value={form.description}
              onChange={handleChange}
            />
            <input
              className="input_style"
              type="url"
              name="url"
              placeholder="Project URL"
              value={form.url}
              onChange={handleChange}
            />

            {form.highlights.map((highlight, index) => (
              <input
                className="input_style"
                key={index}
                type="text"
                placeholder={`Highlight ${index + 1}`}
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
              />
            ))}

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

          {/* Projets List */}
          <ul className={styles.project_list}>
            {projects.map((project, index) => (
              <li key={index} className={styles.project_item}>
                <span>
                  {project.number} - {project.title}
                </span>
                <button
                  onClick={() => handleDeleteProject(index)}
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
