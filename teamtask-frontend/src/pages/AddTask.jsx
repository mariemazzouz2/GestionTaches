import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddTask.scss'; // 👈 importer le style

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des utilisateurs:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(form)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h2>Ajouter une tâche</h2>
      <input
        type="text"
        placeholder="Titre"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <select
        value={form.assignedTo}
        onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        required
      >
        <option value="">-- Sélectionner un utilisateur --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
      <button type="submit">Créer</button>
    </form>
  );
};

export default AddTask;
