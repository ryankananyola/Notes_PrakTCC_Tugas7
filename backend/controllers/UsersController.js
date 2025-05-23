import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET USER
async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      status: "Success",
      message: "Users Retrieved",
      data: users,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET USER BY ID
async function getUserById(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user, 
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE USER
async function createUser(req, res) {
  try {
    const { name, email, gender, password } = req.body;

    if (Object.keys(req.body).length < 4) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    const encryptPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      name: name,
      email: email,
      gender: gender,
      password: encryptPassword,
    });

    return res.status(201).json({
      status: "Success",
      message: "User Registered",
      data: newUser,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// PUT USER
async function updateUser(req, res) {
  try {
    let { password } = req.body;

    if (password) {
      const encryptPassword = await bcrypt.hash(password, 5);
      password = encryptPassword;
    }

    if (Object.keys(req.body).length < 4) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await User.update(
      { ...req.body, password },
      { where: { id: req.params.id } }
    );

    if (result[0] == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE USER
async function deleteUser(req, res) {
  try {
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await User.destroy({ where: { id: req.params.id } });

    if (result == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "User Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// Fungsi LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      const userPlain = user.toJSON();

      const { password: _, refresh_token: __, ...safeUserData } = userPlain;

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const accessToken = jwt.sign(
          safeUserData,
          process.env.ACCESS_TOKEN_SECRET, 
          { expiresIn: "30s" }
        );

        const refreshToken = jwt.sign(
          safeUserData,
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        await User.update(
          { refresh_token: refreshToken },
          {
            where: { id: user.id },
          }
        );

        res.cookie("refreshToken", refreshToken, {
          httpOnly: false, 
          sameSite: "none",

          maxAge: 24 * 60 * 60 * 1000,

          secure: true,
        });

        return res.status(200).json({
          status: "Success",
          message: "Login Berhasil",
          data: safeUserData, 
          accessToken,
        });
      } else {
        const error = new Error("Password atau email salah");
        error.statusCode = 400;
        throw error;
      }
    } else {
      const error = new Error("Password atau email salah");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// Fungsi LOGOUT
async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const error = new Error("Refresh token tidak ada");
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user.refresh_token) {
      const error = new Error("User tidak ditemukan");
      error.statusCode = 401;
      throw error;
    }

    const userId = user.id;

    await User.update(
      { refresh_token: null },
      {
        where: { id: userId },
      }
    );

    res.clearCookie("refreshToken");

    return res.status(200).json({
      status: "Success",
      message: "Logout Berhasil",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
};