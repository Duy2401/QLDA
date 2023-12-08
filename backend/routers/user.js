const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");
const upload = require("../utils/multer");
const router = require("express").Router();
// GET ALL USERS => admin, department, project
router.get(
  "/all",
  middlewareController.verifyProjectRole,
  userController.getAllUsers
);

// GET A USER => admin, department, project and user
router.get(
  "/:id",
  middlewareController.verifyFourRole,
  userController.getAUser
);

// DELETE USER => admin
router.delete(
  "/:id",
  middlewareController.verifyAdmin,
  userController.deleteUser
);

// Update INFOR USER => user, admin
router.put(
  "/edit/:id",
  upload.single("image"),
  middlewareController.verifyUpdateInfoUserRole,
  userController.updateProfileUser
);
// Search User
router.get(
  "/search/:title",
  middlewareController.verifyProjectRole,
  userController.searchUser
);
module.exports = router;
