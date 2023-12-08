const departmentController = require("../controllers/departmentController");
const middlewareController = require("../controllers/middlewareController");
const router = require("express").Router();
// CREATE DEPARTMENT => admin
router.post(
  "/create",
  middlewareController.verifyAdmin,
  departmentController.createDeparment
);
// DELETE DEPARTMENT => admin
router.delete(
  "/:id",
  middlewareController.verifyAdmin,
  departmentController.deleteDepartment
);
// GET ALL DEPARTMENTS => admin
router.get(
  "/",
  middlewareController.verifyAdmin,
  departmentController.getAllDepartments
);
// GET A DEPARTMENT => admin, department
router.get(
  "/:id",
  middlewareController.verifyDepartmentRole,
  departmentController.getADepartment
);
// UPDATE A DEPARTMENT => admin, department
router.put(
  "/:id",
  middlewareController.verifyDepartmentRole,
  departmentController.updateDepartment
);
// ADD EMPLOYEE TO DEPARTMENT
// DELETE EMPLOYEE OUT DEPARTMENT
router.put(
  "/takeUser/:id",
  middlewareController.verifyDepartmentRole,
  departmentController.removeUserInDepartment
);
module.exports = router;
