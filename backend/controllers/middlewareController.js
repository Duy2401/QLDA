const jwt = require("jsonwebtoken");
const roleList = require("../configs/rolesList");
const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(
        accessToken,
        process.env.SECRET_KEY_ACCESS_TOKEN,
        (err, user) => {
          if (err) {
            return res.status(403).json("Token is not valid");
          }
          req.user = user;
          next();
        }
      );
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },
  // IF ACCOUNT LOGIN HAS A USER ROLE
  verifyUser: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.isRole === roleList.User && req.user.id === req.params.id) {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
  // IF ACCOUNT LOGIN HAS A ADMIN ROLE
  verifyAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.isRole === roleList.Admin) {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
  // admin, department, project and user
  verifyFourRole: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (
        req.user.isRole === roleList.User ||
        req.user.isRole === roleList.Admin ||
        req.user.isRole === roleList.ManagerDepartment ||
        req.user.isRole === roleList.ManagerProject
      ) {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
  // admin, department, project
  verifyThreeRole: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (
        req.user.isRole === roleList.Admin ||
        req.user.isRole === roleList.ManagerDepartment ||
        req.user.isRole === roleList.ManagerProject
      ) {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
  // user, admin
  verifyUpdateInfoUserRole: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id === req.params.id) {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
  // admin, department
  verifyDepartmentRole: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (
        req.user.isRole === roleList.Admin ||
        req.user.isRole === roleList.ManagerDepartment
      ) {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
  // admin, department, project
  verifyProjectRole: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (
        req.user.isRole === roleList.Admin ||
        req.user.isRole === roleList.ManagerDepartment ||
        req.user.isRole === roleList.ManagerProject
      ) {
        next();
      } else {
        return res.status(401).json("You're not authenticated");
      }
    });
  },
};
module.exports = middlewareController;
