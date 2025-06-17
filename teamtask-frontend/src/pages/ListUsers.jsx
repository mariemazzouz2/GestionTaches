// src/pages/ListUsers.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import axios from 'axios';
import './Dashboard.scss'; // réutilise le même style

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>TeamTask</h2>
        <ul>
          <li onClick={() => navigate('/dashboard')}>📋 Liste des tâches</li>
          <li onClick={() => navigate('/users')}>👥 Liste des utilisateurs</li>
          <li onClick={handleLogout}>🚪 Logout</li>
        </ul>
      </aside>

      <main className="content">
        <h1>Liste des utilisateurs</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ListUsers;
