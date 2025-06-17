const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const { protect, isManager } = require('../middleware/authMiddleware');

router.get('/', protect, getTasks);
router.post('/', protect, isManager, createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;