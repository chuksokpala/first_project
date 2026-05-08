const express = require("express");
const { body, param } = require("express-validator");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validateMiddleware");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(
    [
      body("title").trim().notEmpty().withMessage("Title is required"),
      body("status")
        .optional()
        .isIn(["todo", "in-progress", "done"])
        .withMessage("Status must be todo, in-progress, or done"),
      validateRequest,
    ],
    createTask
  )
  .get(getTasks);

router
  .route("/:id")
  .get([param("id").isMongoId().withMessage("Invalid task id"), validateRequest], getTaskById)
  .put(
    [
      param("id").isMongoId().withMessage("Invalid task id"),
      body("status")
        .optional()
        .isIn(["todo", "in-progress", "done"])
        .withMessage("Status must be todo, in-progress, or done"),
      validateRequest,
    ],
    updateTask
  )
  .delete([param("id").isMongoId().withMessage("Invalid task id"), validateRequest], deleteTask);

module.exports = router;
