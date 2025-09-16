require('dotenv').config();

const express = require("express");
const configViewEngine = require("./configs/viewEngine");
const apiRoutes = require("./routes/api");
const connection = require("./configs/database");
const { getHomePage } = require("./controllers/homeController");
const cors = require('cors');
const app = express();

// Port
const port = process.env.PORT || 8088;

app.use(cors()); // Áp dụng CORS cho tất cả các route
app.use(express.json()); // Phân tích dữ liệu JSON trong body của request
app.use(express.urlencoded({ extended: true })); // Phân tích dữ liệu URL-encoded trong body của request
configViewEngine(app); // Cấu hình view engine

// Config Route cho view ejs
const webAPI = express.Router();
webAPI.get("/", getHomePage);
app.use("/", webAPI);

// Khai báo route cho API
app.use("/v1/api", apiRoutes);

(async () => {
    try {
        // Kết nối database
        await connection()

        // Listen port
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
})();