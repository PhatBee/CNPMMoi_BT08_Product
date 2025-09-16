require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const white_lists = ["/", "/register", "/login", "/products"];
    if (white_lists.some(item => req.originalUrl.startsWith('/v1/api' + item))) {
        next();
    } else {
        if (req?.headers?.authorization?.split(' ')?.[1]) {
            const token = req.headers.authorization.split(" ")[1];
            
            // Xác thực token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                    createdBy: "hoidanit"
                };
                console.log("Check token: ", decoded)
                next();
            } catch (error) {
                return res.status(401).json({ message: "Token bị hết hạn hoặc không hợp lệ" });
            }
        } else {
            return res.status(401).json({ message: "Bạn chưa truyền Access Token ở header hoặc Token bị hết hạn" });
        }
    }
}

module.exports = auth;