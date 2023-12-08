const taskController = require("../controllers/taskController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();
// Create task for staff => admin, department, project
router.post(
  "/create",
  middlewareController.verifyThreeRole,
  taskController.createTask
);

// Delete the task if it's no longer valuable => admin, department, project
router.delete(
  "/delete/:id",
  middlewareController.verifyThreeRole,
  taskController.deleteTask
);

//Get All Tasks => admin, department, project, user
router.get(
  "/alltask",
  middlewareController.verifyFourRole,
  taskController.getAllTasks
);

// Get a Task => admin, department, project, user
router.get(
  "/:id",
  middlewareController.verifyFourRole,
  taskController.getATask
);

// Update info of task => admin, department, project, user
router.put(
  "/update/:id",
  middlewareController.verifyFourRole,
  taskController.updateTask
);
router.put(
  "/:id",
  middlewareController.verifyFourRole,
  taskController.updateStatusTask
);
// Search Task
router.get(
  "/search/:title",
  middlewareController.verifyFourRole,
  taskController.searchTask
);

module.exports = router;
