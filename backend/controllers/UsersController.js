import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET USER
async function getUsers(req, res) {
  try {
    // Lakukan query "SELECT * nama_tabel" ke db, simpan ke dalam variabel "users"
    const users = await User.findAll();

    // Kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "Users Retrieved",
      data: users, // <- Data seluruh user
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
    /*
      Lakukan query "SELECT * nama_tabel WHERE id = id" ke db
      id diambil dari parameter dari endpoint.
      Setelah itu, simpan hasil query ke dalam variabel "user"
    */
    const user = await User.findOne({ where: { id: req.params.id } });

    // Cek user yg diambil ada apa engga
    // Kalo user gada, masuk ke catch dengan message "User tidak ditemukan 😮" (400)
    if (!user) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    // Kalo user ada, kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user, // <- Data user yg diambil
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
    // Mengambil name, email, gender, password dari request body
    const { name, email, gender, password } = req.body;

    if (Object.keys(req.body).length < 4) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    // Mengenkripsi password, membuat hash sebanyak 2^5 (32) iterasi
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
    // Ambil name, email, gender, dan password dari requerst body
    let { password } = req.body;

    if (password) {
      const encryptPassword = await bcrypt.hash(password, 5);
      password = encryptPassword;
    }

    // Ngecek apakah request body lengkap apa engga
    if (Object.keys(req.body).length < 4) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    // Ngecek apakah id user yg diupdate ada apa ga
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

    // Kalo berhasil, kirim respons sukses (200)
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
    // Ngecek apakah id user yg mau di-delete ada apa ga
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

    // Kalo berhasil, kirim respons sukses (200)
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
    // Ambil email dan password dari request body
    const { email, password } = req.body;

    // Cek apakah email terdaftar di db
    const user = await User.findOne({
      where: { email: email },
    });

    // Kalo email ada (terdaftar)
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

        // Kirim respons berhasil (200)
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