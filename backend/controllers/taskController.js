const Task = require('../models/Task');

// GET /api/tasks (user-specific or all for manager)
exports.getTasks = async (req, res) => {
  try {
    const query = req.user.role === 'manager' ? {} : { assignedTo: req.user.id };
    const tasks = await Task.find(query).populate('assignedTo', 'username');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur lors de la récupération des tâches' });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const task = await Task.create({ title, description, assignedTo });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ msg: 'Erreur lors de la création de la tâche', error: err.message });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ msg: 'Erreur lors de la mise à jour' });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ msg: 'Tâche supprimée' });
  } catch (err) {
    res.status(400).json({ msg: 'Erreur lors de la suppression' });
  }
};
