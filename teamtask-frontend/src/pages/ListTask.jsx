import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask } from '../features/tasks/taskSlice';
import { useNavigate } from 'react-router-dom';
import './ListTask.css';  // <-- importer le fichier css
import { logout } from '../features/auth/authSlice';


// ...dans le composant


const ListTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleLogout = () => {
  dispatch(logout()); // ✅ appel correct à la fonction importée
  navigate('/login');
};

  const { items: tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
  };

  return (
    
    <div className="listtask-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
         </button>

      <h1>Mes Tâches</h1>
      <ul className="listtask-list">
        {tasks.map((task) => (
          <li key={task._id} className="listtask-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <label>
              <strong>Statut :</strong>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
              >
                <option value="à faire">À faire</option>
                <option value="en cours">En cours</option>
                <option value="terminée">Terminée</option>
              </select>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTask;
