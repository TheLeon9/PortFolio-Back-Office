import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';

import Title from '@/components/UI/Title';
import Pillar from '@/components/UI/Pillar';

export default function Projects() {
  const { logged } = useTheme();
  const router = useRouter();

  const [project, setProject] = useState({
    projectNumber: '',
    title: '',
    description: '',
    url: '',
    highlights: ['', '', '', '', ''],
  });
  const [projectsList, setProjectsList] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!logged) {
      router.replace('/');
      return;
    }

    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/project', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProjectsList(data.data);
        } else {
          setError(data.message || '❌ Failed to load Projects');
        }
      } catch (err) {
        setError('❌ Error loading Projects');
      }
    };

    fetchProjects();
  }, [logged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...project.highlights];
    newHighlights[index] = value;
    setProject({ ...project, highlights: newHighlights });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      projectNumber: parseInt(project.projectNumber),
      title: project.title,
      description: project.description,
      url: project.url,
      highlight1: project.highlights[0],
      highlight2: project.highlights[1],
      highlight3: project.highlights[2],
      highlight4: project.highlights[3],
      highlight5: project.highlights[4],
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setProjectsList([...projectsList, data.data]);
        setProject({
          projectNumber: '',
          title: '',
          description: '',
          url: '',
          highlights: ['', '', '', '', ''],
        });
        setSuccess('✅ Project added');
      } else {
        setError(data.message || '❌ Failed to add Project');
      }
    } catch (err) {
      setError('❌ Server error when adding Project');
    }
  };

  const handleRemoveProject = async (index) => {
    const projectToDelete = projectsList[index];

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/project?id=${projectToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        const updatedList = projectsList.filter((_, i) => i !== index);
        setProjectsList(updatedList);
        setSuccess('✅ Project deleted');
      } else {
        setError(data.message || '❌ Failed to delete Project');
      }
    } catch (err) {
      setError('❌ Server error when deleting Project');
    }
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
              name="projectNumber"
              placeholder="Project Number"
              value={project.projectNumber}
              onChange={handleChange}
            />
            <input
              className="input_style"
              type="text"
              name="title"
              placeholder="Project Title"
              value={project.title}
              onChange={handleChange}
              required
            />
            <textarea
              className="input_style"
              name="description"
              placeholder="Project Description"
              value={project.description}
              onChange={handleChange}
            />
            <input
              className="input_style"
              type="url"
              name="url"
              placeholder="Project URL"
              value={project.url}
              onChange={handleChange}
            />

            {project.highlights.map((highlight, index) => (
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
            {projectsList.map((project, index) => (
              <li key={project.id} className={styles.project_item}>
                <span>
                  {project.projectNumber} - {project.title}
                </span>
                <button
                  onClick={() => handleRemoveProject(index)}
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
