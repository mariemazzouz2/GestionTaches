import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.scss'; // 👈 Réutilisation du style

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') navigate('/login');
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
          <h4>Create your account</h4>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              placeholder="Nom d'utilisateur"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />

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

            <label htmlFor="role">Rôle</label>
            <select
              id="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">Utilisateur</option>
              <option value="manager">Manager</option>
            </select>

            <button type="submit">S'inscrire</button>
            <div className="forgot-password">
              <div
                className="register-button"
                onClick={() => navigate('/login')}
              >
                Déjà inscrit ? Se connecter
              </div>
            </div>
          </form>
        </div>

        <div className="login-right">
          <h4>Join Task Team now</h4>
          <p>
            Task Team vous aide à organiser vos tâches quotidiennes, à suivre vos objectifs, et à
            collaborer avec votre équipe dans une interface simple et intuitive. Rejoignez-nous pour
            booster votre productivité !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;