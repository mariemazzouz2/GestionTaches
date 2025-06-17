import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import axios from 'axios';
import './Dashboard.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(fetchTasks());
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 >TeamTask </h2>
        <ul>
          <li onClick={() => navigate('/dashboard')}>📋 Liste des tâches</li>
          <li onClick={() => navigate('/users')}>👥 Liste des utilisateurs</li>
          <li onClick={handleLogout}>🚪 Logout</li>
        </ul>
      </aside>

      <main className="content">
        <h1>Liste des taches</h1>
        {user?.role === 'manager' && (
          <button className="add-task-btn" onClick={() => navigate('/add-task')}>
            ➕ Ajouter une tâche
          </button>
        )}
        <ol>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> - {task.status}
              {user?.role === 'manager' && (
                <>
                  {task.assignedTo && <> (assignée à {task.assignedTo.username})</>}
                  <br />
                  <button className="btn-small btn-edit" onClick={() => handleEdit(task._id)}>✏️ Modifier</button>
<button className="btn-small btn-delete" onClick={() => handleDelete(task._id)}>🗑️ Supprimer</button>

                </>
              )}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
};

export default Dashboard;
