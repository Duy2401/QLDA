const projectController = require("../controllers/projectController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();
// Create a project => admin, department
router.post(
  "/create",
  middlewareController.verifyDepartmentRole,
  projectController.createProject
);

// Delete a project => admin, department
router.delete(
  "/delete/:id",
  middlewareController.verifyDepartmentRole,
  projectController.deleteProject
);

// Get all project => admin, department, project
router.get(
  "/",
  middlewareController.verifyProjectRole,
  projectController.getAllProject
);

// Get a project => admin, department, project
router.get(
  "/:id",
  middlewareController.verifyProjectRole,
  projectController.getAProject
);

// Update Project => admin, department, project
router.put(
  "/:id",
  middlewareController.verifyProjectRole,
  projectController.updateProject
);

// Search Project
router.get(
  "/search/:title",
  middlewareController.verifyProjectRole,
  projectController.searchProject
);
// ADD STAFF INTO PROJECT
router.put("/make/:id", projectController.makeStaff);
module.exports = router;
