import exp from "express";

import {
  UserModel,
} from "../models/UserModel.js";

import {
  config,
} from "dotenv";

import {
  hash,
  compare,
} from "bcrypt";

import {
  verifyToken,
} from "../middlewares/verifyToken.js";

import jwt from "jsonwebtoken";

config();

const {
  sign,
} = jwt;

export const userApp =
  exp.Router();

// =====================================================
// COOKIE OPTIONS
// =====================================================

const cookieOptions = {

  httpOnly: true,

  secure:
    process.env.NODE_ENV ===
    "production",

  sameSite:
    process.env.NODE_ENV ===
    "production"
      ? "none"
      : "lax",

  maxAge:
    2 *
    60 *
    60 *
    1000,
};

// =====================================================
// CREATE TOKEN
// =====================================================

const createToken =
  (user) => {

    return sign(

      {
        id:
          user._id,

        email:
          user.email,

        Mob_num:
          user.Mob_num,

        Name:
          user.Name,
      },

      process.env
        .SECRET_KEY,

      {
        expiresIn:
          "2h",
      }
    );
  };

// =====================================================
// REGISTER
// =====================================================

userApp.post(
  "/users",

  async (
    req,
    res
  ) => {

    try {

      const {

        Name,

        email,

        password,

        Mob_num,

      } = req.body;

      // NAME
      if (
        !Name?.trim()
      ) {

        return res
          .status(400)
          .json({

            message:
              "Name is required",
          });
      }

      // EMAIL
      if (
        !email?.trim()
      ) {

        return res
          .status(400)
          .json({

            message:
              "Email is required",
          });
      }

      // PASSWORD
      if (
        !password?.trim()
      ) {

        return res
          .status(400)
          .json({

            message:
              "Password is required",
          });
      }

      if (
        password.trim()
          .length < 6
      ) {

        return res
          .status(400)
          .json({

            message:
              "Password must be at least 6 characters",
          });
      }

      // MOBILE
      if (
        !Mob_num?.trim()
      ) {

        return res
          .status(400)
          .json({

            message:
              "Mobile number is required",
          });
      }

      if (
        !/^[0-9]{10}$/.test(
          Mob_num.trim()
        )
      ) {

        return res
          .status(400)
          .json({

            message:
              "Mobile number must be exactly 10 digits",
          });
      }

      // EXISTING USER
      const existingUser =
        await UserModel.findOne({

          email:
            email
              .trim()
              .toLowerCase(),
        });

      if (
        existingUser
      ) {

        return res
          .status(409)
          .json({

            message:
              "Email already exists",
          });
      }

      // HASH PASSWORD
      const hashedPassword =
        await hash(
          password,
          12
        );

      // CREATE USER
      const newUserDoc =
        new UserModel({

          Name:
            Name.trim(),

          email:
            email
              .trim()
              .toLowerCase(),

          password:
            hashedPassword,

          Mob_num:
            Mob_num.trim(),
        });

      await newUserDoc.save();

      // TOKEN
      const signedToken =
        createToken(
          newUserDoc
        );

      // COOKIE
      res.cookie(
        "token",

        signedToken,

        cookieOptions
      );

      // REMOVE PASSWORD
      const userObj =
        newUserDoc.toObject();

      delete userObj.password;

      // RESPONSE
      res.status(201).json({

        message:
          "User created",

        payload:
          userObj,

        token:
          signedToken,

        isNewUser:
          true,
      });

    } catch (err) {

      res.status(500).json({

        message:
          err.message,
      });
    }
  }
);

// =====================================================
// LOGIN
// =====================================================

userApp.post(
  "/login",

  async (
    req,
    res
  ) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // VALIDATION
      if (
        !email?.trim() ||

        !password?.trim()
      ) {

        return res
          .status(400)
          .json({

            message:
              "Email and password are required",
          });
      }

      // FIND USER
      const user =
        await UserModel
          .findOne({

            email:
              email
                .trim()
                .toLowerCase(),
          })

          .select(
            "+password"
          );

      if (
        !user
      ) {

        return res
          .status(400)
          .json({

            message:
              "Invalid email",
          });
      }

      // PASSWORD CHECK
      const isMatched =
        await compare(

          password,

          user.password
        );

      if (
        !isMatched
      ) {

        return res
          .status(400)
          .json({

            message:
              "Invalid password",
          });
      }

      // TOKEN
      const signedToken =
        createToken(
          user
        );

      // COOKIE
      res.cookie(
        "token",

        signedToken,

        cookieOptions
      );

      // REMOVE PASSWORD
      const userObj =
        user.toObject();

      delete userObj.password;

      // RESPONSE
      res.status(200).json({

        message:
          "Login success",

        payload:
          userObj,

        token:
          signedToken,

        isNewUser:
          false,
      });

    } catch (err) {

      res.status(500).json({

        message:
          err.message,
      });
    }
  }
);

// =====================================================
// GET USER
// =====================================================

userApp.get(
  "/user",

  verifyToken,

  async (
    req,
    res
  ) => {

    try {

      const user =
        await UserModel.findById(
          req.user.id
        );

      if (
        !user
      ) {

        return res
          .status(404)
          .json({

            message:
              "No user found",
          });
      }

      const userObj =
        user.toObject();

      delete userObj.password;

      res.json({

        message:
          "User details",

        payload:
          userObj,
      });

    } catch (err) {

      res.status(500).json({

        message:
          "Server error",
      });
    }
  }
);

// =====================================================
// LOGOUT
// =====================================================

userApp.get(
  "/logout",

  (
    req,
    res
  ) => {

    res.clearCookie(
      "token",

      cookieOptions
    );

    res.status(200).json({

      message:
        "Logout success",
    });
  }
);

userApp.put(
  "/updateUser",

  verifyToken,

  async (
    req,
    res
  ) => {

    try {

      const {

        Name,

        Mob_num,

        currentPassword,

        newPassword,

      } = req.body;

      // FIND USER
      const user =
        await UserModel.findById(
          req.user.id
        ).select("+password");

      if (!user) {

        return res.status(404).json({

          message:
            "User not found",
        });
      }

      // NAME VALIDATION
      if (
        !Name?.trim()
      ) {

        return res.status(400).json({

          message:
            "Name is required",
        });
      }

      // MOBILE VALIDATION
      if (
        !/^[0-9]{10}$/.test(
          Mob_num?.trim()
        )
      ) {

        return res.status(400).json({

          message:
            "Mobile number must be exactly 10 digits",
        });
      }

      // UPDATE BASIC DETAILS
      user.Name =
        Name.trim();

      user.Mob_num =
        Mob_num.trim();

      // PASSWORD CHANGE
      if (
        newPassword &&
        newPassword.trim()
          .length > 0
      ) {

        if (
          !currentPassword ||
          currentPassword.trim()
            .length === 0
        ) {

          return res.status(400).json({

            message:
              "Current password is required",
          });
        }

        const isMatched =
          await compare(

            currentPassword,

            user.password
          );

        if (!isMatched) {

          return res.status(400).json({

            message:
              "Current password is incorrect",
          });
        }

        if (
          newPassword.length < 8
        ) {

          return res.status(400).json({

            message:
              "Password should be at least 8 characters",
          });
        }

        const hashedPassword =
          await hash(
            newPassword,
            12
          );

        user.password =
          hashedPassword;
      }

      await user.save();

      const userObj =
        user.toObject();

      delete userObj.password;

      res.status(200).json({

        message:
          "Profile updated successfully",

        payload:
          userObj,
      });

    } catch (err) {

      res.status(500).json({

        message:
          err.message,
      });
    }
  }
);