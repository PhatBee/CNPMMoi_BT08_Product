require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        // Kiểm tra user có tồn tại
        const user = await User.findOne({ email });
        if (user) {
            console.log("User already exists");
            return null;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Lưu user
        let result = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        // Lấy thông tin user
        const user = await User.findOne({ email: email });
        if (user) {
            // Kiểm tra password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {
                    EC: 2,
                    EM: 'Email hoặc mật khẩu không đúng',
                }
            } else {
                // Tạo token
                const payload = {
                    email: user.email,
                    name: user.name,
                }

                const access_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name,
                    }
                };
            }
        } else {
            return {
                EC: 1,
                EM: "Người dùng không tồn tại"
            }
        }

    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
};

const getUserService = async () => {
    try {
        let result = await User.find({}).select("-password");
        return result;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
}

const getAccountService = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // lấy user từ DB (để chắc chắn user còn tồn tại)
        const user = await User.findOne({ email: decoded.email }).select("email name");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            email: user.email,
            name: user.name,
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
module.exports = {
    createUserService,
    loginService,
    getUserService,
    getAccountService
}
