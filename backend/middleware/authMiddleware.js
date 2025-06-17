const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token manquant' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'Token invalide' });
    req.user = decoded;
    next();
  });
};

const isManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ msg: 'Accès manager requis' });
  }
  next();
};

module.exports = { protect, isManager };
