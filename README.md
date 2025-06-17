# 🧠 TeamTask – Application MERN de Gestion des Tâches

TeamTask est une application de gestion des tâches développée avec la stack MERN (MongoDB, Express.js, React, Node.js) et Redux Toolkit pour la gestion d’état. Elle permet une collaboration structurée entre les membres d'une équipe, avec une gestion des rôles (utilisateur / manager) et un système sécurisé d’authentification via JWT.

---

## 🔥 Fonctionnalités principales

- 🔐 **Authentification sécurisée** (JWT + middleware)
- 👥 **Gestion multi-utilisateurs avec rôles** (User, Manager)
- ✅ **CRUD complet des tâches**
- 🧑‍💻 **Interface utilisateur avec React + Redux Toolkit**
- 🔄 **Statut des tâches : À faire / En cours / Terminée**
- 📊 **Dashboard personnalisé selon le rôle**
- 📋 **Page Admin : liste des utilisateurs**

---

## 🧰 Technologies utilisées

### Frontend :
- React
- Redux Toolkit
- React Router
- Axios
- SCSS 

### Backend :
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs (pour le hash du mot de passe)
- dotenv

---

## ⚙️ Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/teamtask.git
cd teamtask
📦 Structure du projet
teamtask/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

🚀 Lancement du projet
🔧 Prérequis
Node.js >= 16.x
MongoDB installé 
npm 

1. Configuration du backend
cd backend
npm install

Créer un fichier .env basé sur .env.example :

env:
PORT=5000
MONGO_URI=mongodb://localhost:27017/teamtaskdb
JWT_SECRET=supersecretjwt123

Lancer le serveur backend :
npm run dev

2. Configuration du frontend
cd teamtask-frontend
npm install

Lancer le serveur React :
npm run dev

🔐 Authentification
Utilisation de JWT pour les tokens

Stockage du token dans le localStorage

Routes protégées via middleware backend

Permissions contrôlées côté frontend et backend

🧑‍🏫 Rôles & Permissions
Rôle	  Droits
User	: Consulter ses propres tâches, changer le statut
Manager : 	Voir toutes les tâches, créer/assigner/modifier/supprimer des tâches

📮 API – Routes principales
🔑 Auth
POST /api/auth/register – Inscription

POST /api/auth/login – Connexion

📋 Tasks
GET /api/tasks – Liste des tâches (selon rôle)

POST /api/tasks – Créer une tâche (Manager uniquement)

PUT /api/tasks/:id – Modifier une tâche

DELETE /api/tasks/:id – Supprimer une tâche

✅ Fonctionnalités terminées
 Système d'authentification JWT

 Gestion des utilisateurs avec rôles

 CRUD des tâches

 Interface React + Redux Toolkit

 Filtrage des tâches par statut

 Page admin (liste des utilisateurs)

 Tests unitaires

🤝 Contribuer
Les contributions sont les bienvenues ! Pour contribuer :

Fork ce dépôt

Crée une branche feature/quelque-chose

Commit tes modifications

Ouvre une Pull Request

📝 Licence
Ce projet est open-source et libre d'utilisation à des fins pédagogiques.

📧 Contact
Développé par [Ton Nom]
📫 Email : mariemazzouz1234@gmail.com
🌐 GitHub : https://github.com/mariemazzouz2
