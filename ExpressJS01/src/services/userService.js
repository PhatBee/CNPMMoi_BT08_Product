require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        // Kiểm tra user có tồn tại
        const user = await User.findOne({ email });
        if (user){
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
        if (user){
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

module.exports = {
    createUserService,
    loginService,
    getUserService
}
