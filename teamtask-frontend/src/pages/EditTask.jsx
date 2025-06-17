import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, fetchTasks } from '../features/tasks/taskSlice';
import { useParams, useNavigate } from 'react-router-dom';
import './EditTask.scss';

import axios from 'axios';

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', status: '' });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const task = res.data.find((t) => t._id === id);
        if (task) setFormData(task);
      } catch (err) {
        console.error('Erreur fetch task :', err);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateTask({ id, updates: formData }));
    dispatch(fetchTasks());
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
      <h2>Modifier la tâche</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.title}
          placeholder="Titre"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          value={formData.description}
          placeholder="Description"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="">-- Statut --</option>
          <option value="en cours">En cours</option>
          <option value="terminée">Terminée</option>
        </select>
        <button type="submit">💾 Enregistrer</button>
      </form>
    </div>
  );
};

export default EditTask;
