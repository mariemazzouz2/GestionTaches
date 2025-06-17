// controllers/userController.js
const User = require('../models/User');
// Middleware optionnel à appliquer avant getAllUsers
exports.isManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ msg: 'Accès refusé' });
  }
  next();
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }, 'username email role'); // 🔁 ici
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la récupération des utilisateurs' });
  }
};

