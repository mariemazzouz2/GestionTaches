import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.scss';  // 👈 importer le style personnalisé

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        const role = res.payload?.user?.role;
        if (role === 'user') {
          navigate('/list-task');
        } else if (role === 'manager') {
          navigate('/dashboard');
        } else {
          console.error('Rôle inconnu:', role);
        }
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
            alt="logo"
          />
          <h4>Welcome to Task Team</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button type="submit">Se connecter</button>
            <div className="forgot-password">
  <div
    className="register-button"
    onClick={() => navigate('/register')}
  >
    Register
  </div>
</div>
          </form>
        </div>

        <div className="login-right">
          <h4>We are more than just an application</h4>
          <p>
            Task Team is a task management application designed to help users efficiently organize and track their daily activities. It allows users to create, update, and delete tasks, assign priorities, and monitor progress in real time. With a simple and user-friendly interface, Task Team makes it easy to stay organized, collaborate with others, and boost productivity both individually and as a team
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
