const express = require('express');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { createUser, handleLogin, getUser, getAccount, getMe } = require('../controllers/userController');
const { listProducts, searchProducts, reindexAllProducts, getCategories, getProductById } = require('../controllers/productController');

const apiRoutes = express.Router();

apiRoutes.all(/.*/, auth);

apiRoutes.get("/", (req, res) => {
    return res.status(200).json("Hello World Api")
})

apiRoutes.post("/register", createUser);
apiRoutes.post("/login", handleLogin);
apiRoutes.get("/user", getUser);
apiRoutes.get("/account", delay, getAccount);
apiRoutes.get("/products", listProducts);
apiRoutes.get("/products/search", searchProducts);
apiRoutes.get("/products/categories", getCategories);
apiRoutes.get("/products/:id", getProductById);
apiRoutes.get("/me", getMe);


module.exports = apiRoutes;