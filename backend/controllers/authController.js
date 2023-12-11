const User = require("../models/User");
const Department = require("../models/Department");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = {
  createAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isRole: user.isRole,
      },
      process.env.SECRET_KEY_ACCESS_TOKEN,
      {
        expiresIn: "20s",
      }
    );
  },
  createRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isRole: user.isRole,
      },
      process.env.SECRET_KEY_REFRESH_TOKEN,
      {
        expiresIn: "365d",
      }
    );
  },
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        isRole: req.body.isRole,
        password: hashed,
        OfDepartment: req.body.OfDepartment,
        infor: {
          avatarUrl: req.body.avatarUrl,
          position: req.body.position,
          name: req.body.name,
          gender: req.body.gender,
          dateOfBirth: req.body.dateOfBirth,
          numberPhone: req.body.numberPhone,
          address: req.body.address,
        },
      });
      const user = await newUser.save();
      if (req.body.OfDepartment) {
        const department = Department.findById(req.body.OfDepartment);
        await department.updateMany({ $push: { users: user._id } });
      }
      if (req.body.OfDepartment && req.body.isRole === 2003) {
        const department = Department.findById(req.body.OfDepartment);
        await department.updateMany({ $set: { manage: user._id } });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.body.username,
      }).populate("OfDepartment");
      if (!user) {
        return res.status(404).json("Wrong username");
      }
      const valiPass = await bcrypt.compare(req.body.password, user.password);
      if (!valiPass) {
        return res.status(404).json("Wrong password");
      }
      if (user && valiPass) {
        const accessToken = authController.createAccessToken(user);
        const refreshToken = authController.createRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "none",
          domain: "qlda-duy2401.vercel.app",
        });
        const { password, ...others } = user._doc;
        const returnedUser = {
          ...others,
          accessToken: accessToken,
        };
        return res.status(200).json(returnedUser);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  requestRefreshTokens: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You're not Authenticated");
    }
    jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN,
      (err, user) => {
        if (err) {
          console.log(err);
        }
        // Create new Access and Refresh Token
        const newAccessToken = authController.createAccessToken(user);
        const newRefreshToken = authController.createRefreshToken(user);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
          domain: "qlda-duy2401.vercel.app",
        });
        return res
          .status(200)
          .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
      }
    );
  },
  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json("Logout successfully");
  },
};

module.exports = authController;
