import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

import { useTheme } from '@/context/ThemeContext.js';
import { useRouter } from 'next/router';

import Title from '@/components/UI/Title';
import Pillar from '@/components/UI/Pillar';

export default function Projects() {
  const { logged } = useTheme();
  const router = useRouter();

  const [service, setService] = useState({
    title: '',
    description: '',
    price: 0.00,
  });
  const [servicesList, setServicesList] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!logged) {
      router.replace('/');
      return;
    }

    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/service', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setServicesList(data.data);
        } else {
          setError(data.message || '❌ Failed to load services');
        }
      } catch (err) {
        setError('❌ Error loading services');
      }
    };

    fetchServices();
  }, [logged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      title: service.title,
      description: service.description,
      price: parseFloat(service.price),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setServicesList([...servicesList, data.data]);
        setService({
          title: '',
          description: '',
          price: 0,
        });
        setSuccess('✅ Service added');
      } else {
        setError(data.message || '❌ Failed to add Service');
      }
    } catch (err) {
      setError('❌ Server error when adding Service');
    }
  };

  const handleRemoveService = async (index) => {
    const serviceToDelete = servicesList[index];

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/service?id=${serviceToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        const updatedList = servicesList.filter((_, i) => i !== index);
        setServicesList(updatedList);
        setSuccess('✅ Service deleted');
      } else {
        setError(data.message || '❌ Failed to delete Service');
      }
    } catch (err) {
      setError('❌ Server error when deleting Service');
    }
  };

  return (
    <div className={styles.section_container}>
      <div className={styles.services}>
        {/* Pillar */}
        <Pillar />
        {/* Middle */}
        <div className={styles.container}>
          {/* Title */}
          <Title title="Services" />

          {/* Forms */}
          <form className={styles.services_form} onSubmit={handleAddService}>
            <input
              className="input_style"
              type="text"
              name="title"
              placeholder="Service Title"
              value={service.title}
              onChange={handleChange}
              required
            />
            <textarea
              className="input_style"
              name="description"
              placeholder="Service Description"
              value={service.description}
              onChange={handleChange}
            />
            <input
              className="input_style"
              type="number"
              name="price"
              placeholder="Service Price"
              value={service.price}
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
              ADD
            </button>
          </form>

          {/* Services List */}
          <ul className={styles.service_list}>
            {servicesList.map((service, index) => (
              <li key={service.id} className={styles.service_item}>
                <span>
                  {service.title} - {service.price} €
                </span>
                <button
                  onClick={() => handleRemoveService(index)}
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
